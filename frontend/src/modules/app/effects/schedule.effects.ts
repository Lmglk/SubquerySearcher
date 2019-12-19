import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApiScheduleService } from '../services/api-schedule.service';
import { AppState } from '../interfaces/AppState';
import { LoadScheduleAction } from '../actions/LoadScheduleAction';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { ErrorNotificationAction } from '../actions/ErrorNotificationAction';
import { OptimizationMode } from '../enums/OptimizationOptions';

@Injectable()
export class ScheduleEffects {
    @Effect()
    public loadSchedule$ = this.actions$.pipe(
        ofType<LoadScheduleAction>(LoadScheduleAction.type),
        switchMap(action =>
            this.apiScheduleService.getSchedule(action.payload.graph).pipe(
                switchMap(originalSchedule => {
                    if (action.payload.option === OptimizationMode.DEFAULT) {
                        return of(new SetScheduleAction(originalSchedule));
                    }

                    return this.apiScheduleService
                        .optimizeSchedule(
                            action.payload.graph,
                            originalSchedule,
                            action.payload.option
                        )
                        .pipe(map(schedule => new SetScheduleAction(schedule)));
                }),
                catchError(() =>
                    of(
                        new ErrorNotificationAction(
                            'Optimize schedule is failed'
                        )
                    )
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly apiScheduleService: ApiScheduleService
    ) {}
}
