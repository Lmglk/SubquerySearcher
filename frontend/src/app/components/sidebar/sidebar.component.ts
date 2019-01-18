import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Graph } from '../../types/graph';
import { ToastrService } from 'ngx-toastr';
import { OptimicationData } from '../../types/optimication-data';
import { ScheduleResult } from '../../types/schedule-result';
import { Statistic } from '../../types/statistic';
import { AppState } from '../../types/AppState';
import { select, Store } from '@ngrx/store';
import { SetGraphAction } from '../../store/actions/graph.actions';
import { selectGraph } from '../../store/selectors/graph.selector';
import { take } from 'rxjs/operators';
import { SetScheduleAction } from '../../store/actions/schedule.actions';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    @ViewChild('fileUpload') inputFile: ElementRef;

    public readonly optimizationOptions = [
        'No optimization',
        'Optimization with timestamp',
        'Optimization without timestamp',
    ];

    public graph: Graph;
    public statistics: Statistic;
    public separatedNodeList: any;
    public selectedOptimizationOption: number;

    private file: File;

    constructor(
        private toastr: ToastrService,
        private httpService: HttpService,
        private store: Store<AppState>
    ) {
        this.separatedNodeList = 0;
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
        this.selectedOptimizationOption = parseInt(
            (event.target as HTMLSelectElement).value
        );
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
            this.store.dispatch(new SetScheduleAction(schedule));
        } catch (e) {
            this.toastr.error(e.error);
        }
        // this.schedule.emit(null);
        // this.modifiedGraph = anew Graph(this.graph);
        // this.separatedNodeList.filter(item => item.count > 1).forEach(item => this.separateNodes(item));
        //
        // try {
        //     let scheduleResult = await this.httpService.getSchedule(this.modifiedGraph);
        //
        //     switch (this.selectedOptimizationOption) {
        //         case 1:
        //             scheduleResult = await this.optimizationGraphWithTimestamp({
        //                 graph: this.modifiedGraph,
        //                 schedule: scheduleResult.schedule,
        //             });
        //             break;
        //         case 2:
        //             scheduleResult = await this.optimizationGraphWithoutTimestamp({
        //                 graph: this.modifiedGraph,
        //                 schedule: scheduleResult.schedule,
        //             });
        //             break;
        //     }
        //
        //     this.graphData.emit(this.modifiedGraph);
        //     this.schedule.emit(scheduleResult.schedule);
        //     this.statistics = scheduleResult.statistics;
        // } catch (e) {
        //     this.toastr.error(e.error);
        // }
    }

    private async optimizationGraphWithoutTimestamp(
        optimizationData: OptimicationData
    ): Promise<ScheduleResult> {
        return await this.httpService.optimizeScheduleWithoutTimestamp(
            optimizationData
        );
    }

    private async optimizationGraphWithTimestamp(
        optimizationData: OptimicationData
    ): Promise<ScheduleResult> {
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
