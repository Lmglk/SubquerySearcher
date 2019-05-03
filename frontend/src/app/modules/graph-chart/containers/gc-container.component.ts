import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../types/AppState';
import { Observable } from 'rxjs';
import {
    selectGroups,
    selectMaxGroupSize,
} from '../../../store/selectors/schedule.selector';
import { Group } from '../../../types/Group';
import { Graph } from '../../../types/Graph';
import { selectModifiedGraph } from '../../../store/selectors/graph.selector';

@Component({
    selector: 'app-gc-container',
    template: `
        <app-free-placement-container
            *ngIf="(groups$ | async).length === 0"
            [graph]="graph$ | async"
            [nodeRadius]="nodeRadius"
            [height]="height"
            [width]="width"
        ></app-free-placement-container>

        <app-gc-sequence-placement-container
            *ngIf="(groups$ | async).length !== 0"
            [graph]="graph$ | async"
            [nodeRadius]="nodeRadius"
            [height]="height"
            [width]="width"
            [groups]="groups$ | async"
            [maxGroupSize]="maxGroupSize$ | async"
        ></app-gc-sequence-placement-container>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                width: 100%;
            }
        `,
    ],
})
export class GcContainerComponent implements AfterViewInit {
    public readonly nodeRadius = 15;

    public height: number;
    public width: number;

    public graph$: Observable<Graph>;
    public groups$: Observable<Group[]>;
    public maxGroupSize$: Observable<number>;

    constructor(
        private readonly store: Store<AppState>,
        private elRef: ElementRef
    ) {
        this.graph$ = this.store.pipe(select(selectModifiedGraph));
        this.groups$ = this.store.pipe(select(selectGroups));
        this.maxGroupSize$ = this.store.pipe(select(selectMaxGroupSize));
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.getContentSize());
    }

    @HostListener('window:resize')
    private handleResize() {
        this.getContentSize();
    }

    private getContentSize() {
        this.height = this.elRef.nativeElement.clientHeight;
        this.width = this.elRef.nativeElement.clientWidth;
    }
}
