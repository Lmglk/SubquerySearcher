import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Graph } from '../../types/Graph';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../types/AppState';
import { select, Store } from '@ngrx/store';
import { SetGraphAction } from '../../store/actions/graph.actions';
import { selectGraph } from '../../store/selectors/graph.selector';
import { take } from 'rxjs/operators';
import { SetScheduleAction } from '../../store/actions/schedule.actions';
import {
    OptimizationOption,
    OptimizationOptions,
} from '../../enums/OptimizationOptions';
import { Schedule } from '../../types/Schedule';
import { OptimizationData } from '../../types/OptimizationData';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    @ViewChild('fileUpload') inputFile: ElementRef;

    public readonly optimizationOptions = OptimizationOptions;

    public graph: Graph;
    public separatedNodeList: any;
    public selectedOptimizationOption: OptimizationOption;

    private file: File;

    constructor(
        private toastr: ToastrService,
        private httpService: HttpService,
        private store: Store<AppState>
    ) {
        this.separatedNodeList = 0;
        this.selectedOptimizationOption = OptimizationOption.NO_OPTIMIZATION;
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
            this.graph = await this.httpService.uploadFile(this.file);
            this.store.dispatch(new SetGraphAction(this.graph));
        } catch (e) {
            this.toastr.error(e.error);
        }
    }

    public changeOptimizationOption(event: Event) {
        this.selectedOptimizationOption = (event.target as HTMLSelectElement)
            .value as OptimizationOption;
    }

    public async calculateGraph(): Promise<void> {
        const graph = await this.store
            .pipe(
                select(selectGraph),
                take(1)
            )
            .toPromise();

        try {
            const schedule = await this.httpService.getSchedule(graph);

            switch (this.selectedOptimizationOption) {
                case OptimizationOption.OPTIMIZATION_WITH_TIMESTAMP:
                    const optimizedScheduleWithTime = await this.optimizationGraphWithTimestamp(
                        { graph, schedule }
                    );
                    this.store.dispatch(new SetScheduleAction(optimizedScheduleWithTime));
                    break;

                case OptimizationOption.OPTIMIZATION_WITHOUT_TIMESTAMP:
                    const optimizedSchedule = await this.optimizationGraphWithoutTimestamp(
                        { graph, schedule }
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

    private async optimizationGraphWithoutTimestamp(
        optimizationData: OptimizationData
    ): Promise<Schedule> {
        return await this.httpService.optimizeScheduleWithoutTimestamp(
            optimizationData
        );
    }

    private async optimizationGraphWithTimestamp(
        optimizationData: OptimizationData
    ): Promise<Schedule> {
        return await this.httpService.optimizeScheduleWithTimestamp(
            optimizationData
        );
    }

    private separateNodes(item) {
        // const targetNodes = this.modifiedGraph.getTargetEdges(item.id);
        // const sourceNodes = this.modifiedGraph.getSourceEdges(item.id);
        // this.modifiedGraph.removeNode(item.id);
        //
        // for (let i = 1; i <= item.count; i++) {
        //   const nodeName = `${item.id}.${i}`;
        //   this.modifiedGraph.addNode(nodeName);
        //
        //   targetNodes.forEach(targetNode =>
        //     this.modifiedGraph.addTargetEdge(nodeName, targetNode.target));
        //
        //   sourceNodes.forEach(sourceNode =>
        //     this.modifiedGraph.addSourceEdge(sourceNode.source, nodeName))
        // }
    }
}
