import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    ActionTypes,
    LoadScheduleAction,
    OptimizeScheduleWithoutTimeStep,
    OptimizeScheduleWithTimeStep,
    RejectOptimizeSchedule,
    SetScheduleAction,
} from '../store/actions/schedule.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../types/AppState';
import { OptimizationOption } from '../enums/OptimizationOptions';

@Injectable()
export class ScheduleEffects {
    @Effect()
    public loadSchedule$ = this.actions$.pipe(
        ofType(ActionTypes.LoadScheduleAction),
        mergeMap((action: LoadScheduleAction) =>
            this.httpService.getSchedule(action.payload.graph).pipe(
                map(schedule => {
                    switch (action.payload.option) {
                        case OptimizationOption.OPTIMIZATION_WITH_TIMESTAMP:
                            return new OptimizeScheduleWithTimeStep({
                                graph: action.payload.graph,
                                schedule: schedule,
                            });

                        case OptimizationOption.OPTIMIZATION_WITHOUT_TIMESTAMP:
                            return new OptimizeScheduleWithoutTimeStep({
                                graph: action.payload.graph,
                                schedule: schedule,
                            });

                        default:
                            return new SetScheduleAction(schedule);
                    }
                }),
                catchError(() => {
                    this.toastr.error('Optimize schedule is failed');
                    return of(new RejectOptimizeSchedule());
                })
            )
        )
    );

    @Effect()
    public optimizeScheduleWithTimeStep$ = this.actions$.pipe(
        ofType(ActionTypes.OptimizeScheduleWithTimeStepAction),
        mergeMap((action: OptimizeScheduleWithTimeStep) =>
            this.httpService.optimizeScheduleWithTimestamp(action.payload).pipe(
                map(schedule => new SetScheduleAction(schedule)),
                catchError(() => {
                    this.toastr.error('Optimize schedule is failed');
                    return of(new RejectOptimizeSchedule());
                })
            )
        )
    );

    @Effect()
    public optimizeScheduleWithoutTimeStep$ = this.actions$.pipe(
        ofType(ActionTypes.OptimizeScheduleWithoutTimeStepAction),
        mergeMap((action: OptimizeScheduleWithoutTimeStep) =>
            this.httpService
                .optimizeScheduleWithoutTimestamp(action.payload)
                .pipe(
                    map(schedule => new SetScheduleAction(schedule)),
                    catchError(() => {
                        this.toastr.error('Optimize schedule is failed');
                        return of(new RejectOptimizeSchedule());
                    })
                )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly httpService: HttpService,
        private readonly toastr: ToastrService
    ) {}
}
