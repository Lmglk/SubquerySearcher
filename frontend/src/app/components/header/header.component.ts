import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { take } from 'rxjs/operators';
import { ResetScheduleAction, SetScheduleAction } from '../../store/actions/schedule.actions';
import { OptimizationData } from '../../types/OptimizationData';
import { Schedule } from '../../types/Schedule';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @ViewChild('fileUpload') inputFile: ElementRef;

    public readonly optimizationOptions = OptimizationOptions;
    public selectedOptimizationOption: OptimizationOption;

    private file: File;

    constructor(
        private toastr: ToastrService,
        private httpService: HttpService,
        private store: Store<AppState>
    ) {
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
            const graph = await this.httpService.uploadFile(this.file);
            this.store.dispatch(new SetGraphAction(graph));
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
                    this.store.dispatch(
                        new SetScheduleAction(optimizedScheduleWithTime)
                    );
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
}
