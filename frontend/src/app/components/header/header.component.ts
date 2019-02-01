import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SetGraphAction } from '../../store/actions/graph.actions';
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
    ResetScheduleAction,
    SetScheduleAction,
} from '../../store/actions/schedule.actions';
import { SetNodesListAction } from '../../store/actions/separate-nodes.action';
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
        if (!this.file) {
            return;
        }

        try {
            const graph = await this.httpService.uploadFile(this.file);
            this.store.dispatch(new SetGraphAction(graph));
            this.store.dispatch(new SetNodesListAction(graph.nodes));
            this.store.dispatch(new ResetScheduleAction());
        } catch (e) {
            this.toastr.error(e.error);
        }
    }

    public changeOptimizationOption(event: Event) {
        this.selectedOptimizationOption = (event.target as HTMLSelectElement)
            .value as OptimizationOption;
    }

    public async calculateGraph(): Promise<void> {
        try {
            const graphWithSeparateNodes = await this.httpService.separateNodes(
                this.graph,
                this.separateNodesInfo
            );

            const schedule = await this.httpService.getSchedule(
                graphWithSeparateNodes
            );
            this.store.dispatch(new SetGraphAction(graphWithSeparateNodes));

            switch (this.selectedOptimizationOption) {
                case OptimizationOption.OPTIMIZATION_WITH_TIMESTAMP:
                    const optimizedScheduleWithTime = await this.httpService.optimizeScheduleWithTimestamp(
                        { graph: graphWithSeparateNodes, schedule: schedule }
                    );
                    this.store.dispatch(
                        new SetScheduleAction(optimizedScheduleWithTime)
                    );
                    break;

                case OptimizationOption.OPTIMIZATION_WITHOUT_TIMESTAMP:
                    const optimizedSchedule = await this.httpService.optimizeScheduleWithoutTimestamp(
                        { graph: graphWithSeparateNodes, schedule: schedule }
                    );
                    this.store.dispatch(
                        new SetScheduleAction(optimizedSchedule)
                    );
                    break;

                default:
                    this.store.dispatch(new SetScheduleAction(schedule));
            }
        } catch (e) {
            this.toastr.error(e.error);
        }
    }

    public ngOnDestroy(): void {
        this.graphSubscription.unsubscribe();
        this.separateNodeInfoSubscription.unsubscribe();
    }
}
