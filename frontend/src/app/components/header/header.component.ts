import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
    SetModifiedGraphAction,
    UploadGraphAction,
} from '../../store/actions/graph.actions';
import { HttpService } from '../../services/http.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../types/AppState';
import { ToastrService } from 'ngx-toastr';
import {
    OptimizationOption,
    OptimizationOptions,
} from '../../enums/OptimizationOptions';
import { selectGraph } from '../../store/selectors/graph.selector';
import {
    OptimizeScheduleWithoutTimeStep,
    OptimizeScheduleWithTimeStep,
    SetScheduleAction,
} from '../../store/actions/schedule.actions';
import { selectSeparateNodes } from '../../store/selectors/separate-nodes.selector';
import { InfoSeparate } from '../../types/InfoSeparate';
import { Graph } from '../../types/Graph';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
    @ViewChild('fileUpload') inputFile: ElementRef;

    public readonly optimizationOptions = OptimizationOptions;
    public selectedOptimizationOption: OptimizationOption;

    private file: File;
    private graph: Graph;
    private separateNodesInfo: InfoSeparate[];
    private graphSubscription: Subscription;
    private separateNodeInfoSubscription: Subscription;

    constructor(
        private toastr: ToastrService,
        private httpService: HttpService,
        private store: Store<AppState>
    ) {
        this.selectedOptimizationOption = OptimizationOption.NO_OPTIMIZATION;

        this.graphSubscription = this.store
            .pipe(select(selectGraph))
            .subscribe(graph => (this.graph = graph));

        this.separateNodeInfoSubscription = this.store
            .pipe(select(selectSeparateNodes))
            .subscribe(
                separateNodesInfo =>
                    (this.separateNodesInfo = separateNodesInfo)
            );
    }

    public changeFile(): void {
        const fileBrowser = this.inputFile.nativeElement;
        this.file = fileBrowser.files[0];
    }

    public async uploadFile(): Promise<void> {
        if (this.file) {
            this.store.dispatch(new UploadGraphAction(this.file));
        } else {
            this.toastr.info('Please select a file');
        }
    }

    public changeOptimizationOption(event: Event) {
        this.selectedOptimizationOption = (event.target as HTMLSelectElement)
            .value as OptimizationOption;
    }

    public async calculateGraph(): Promise<void> {
        try {
            const modifiedGraph = await this.httpService.separateNodes(
                this.graph,
                this.separateNodesInfo
            );
            const schedule = await this.httpService.getSchedule(modifiedGraph);

            switch (this.selectedOptimizationOption) {
                case OptimizationOption.OPTIMIZATION_WITH_TIMESTAMP:
                    this.store.dispatch(
                        new OptimizeScheduleWithTimeStep({
                            graph: modifiedGraph,
                            schedule: schedule,
                        })
                    );
                    break;

                case OptimizationOption.OPTIMIZATION_WITHOUT_TIMESTAMP:
                    this.store.dispatch(
                        new OptimizeScheduleWithoutTimeStep({
                            graph: modifiedGraph,
                            schedule: schedule,
                        })
                    );
                    break;

                default:
                    this.store.dispatch(new SetScheduleAction(schedule));
            }
            this.store.dispatch(new SetModifiedGraphAction(modifiedGraph));
        } catch (e) {
            this.toastr.error(e.error);
        }
    }

    public ngOnDestroy(): void {
        this.graphSubscription.unsubscribe();
        this.separateNodeInfoSubscription.unsubscribe();
    }
}
