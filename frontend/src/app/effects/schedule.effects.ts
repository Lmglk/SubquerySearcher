import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    ActionTypes,
    OptimizeScheduleWithoutTimeStep,
    OptimizeScheduleWithTimeStep,
    RejectOptimizeSchedule,
    SetScheduleAction,
} from '../store/actions/schedule.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ScheduleEffects {
    @Effect()
    public optimizeScheduleWithTimeStep$ = this.actions$.pipe(
        ofType(ActionTypes.OptimizeScheduleWithTimeStep),
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
        ofType(ActionTypes.OptimizeScheduleWithoutTimeStep),
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
        private readonly httpService: HttpService,
        private readonly toastr: ToastrService
    ) {}
}
