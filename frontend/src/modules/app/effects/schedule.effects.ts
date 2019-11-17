import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { OptimizationOption } from '../enums/OptimizationOptions';
import { LoadScheduleAction } from '../store/actions/LoadScheduleAction';
import { OptimizeScheduleWithTimeStepAction } from '../store/actions/OptimizeScheduleWithTimeStepAction';
import { OptimizeScheduleWithoutTimeStepAction } from '../store/actions/OptimizeScheduleWithoutTimeStepAction';
import { SetScheduleAction } from '../store/actions/SetScheduleAction';
import { RejectLoadScheduleAction } from '../store/actions/RejectLoadScheduleAction';
import { RejectOptimizeScheduleAction } from '../store/actions/RejectOptimizeScheduleAction';
import { ApiScheduleService } from '../services/api-schedule.service';
import { AppState } from '../interfaces/AppState';

@Injectable()
export class ScheduleEffects {
    @Effect()
    public loadSchedule$ = this.actions$.pipe(
        ofType<LoadScheduleAction>(LoadScheduleAction.type),
        mergeMap(action =>
            this.apiScheduleService.getSchedule(action.payload.graph).pipe(
                map(schedule => {
                    switch (action.payload.option) {
                        case OptimizationOption.OPTIMIZATION_WITH_TIMESTAMP:
                            return new OptimizeScheduleWithTimeStepAction({
                                graph: action.payload.graph,
                                schedule: schedule,
                            });

                        case OptimizationOption.OPTIMIZATION_WITHOUT_TIMESTAMP:
                            return new OptimizeScheduleWithoutTimeStepAction({
                                graph: action.payload.graph,
                                schedule: schedule,
                            });

                        default:
                            return new SetScheduleAction(schedule);
                    }
                }),
                catchError(() => {
                    this.toastr.error('Optimize schedule is failed');
                    return of(new RejectLoadScheduleAction());
                })
            )
        )
    );

    @Effect()
    public optimizeScheduleWithTimeStep$ = this.actions$.pipe(
        ofType<OptimizeScheduleWithTimeStepAction>(
            OptimizeScheduleWithTimeStepAction.type
        ),
        mergeMap(action =>
            this.apiScheduleService
                .optimizeScheduleWithTimestamp(action.payload)
                .pipe(
                    map(schedule => new SetScheduleAction(schedule)),
                    catchError(() => {
                        this.toastr.error('Optimize schedule is failed');
                        return of(new RejectOptimizeScheduleAction());
                    })
                )
        )
    );

    @Effect()
    public optimizeScheduleWithoutTimeStep$ = this.actions$.pipe(
        ofType<OptimizeScheduleWithoutTimeStepAction>(
            OptimizeScheduleWithoutTimeStepAction.type
        ),
        mergeMap(action =>
            this.apiScheduleService
                .optimizeScheduleWithoutTimestamp(action.payload)
                .pipe(
                    map(schedule => new SetScheduleAction(schedule)),
                    catchError(() => {
                        this.toastr.error('Optimize schedule is failed');
                        return of(new RejectOptimizeScheduleAction());
                    })
                )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly apiScheduleService: ApiScheduleService,
        private readonly toastr: ToastrService
    ) {}
}
