import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app/types/AppState';
import { Observable } from 'rxjs';
import { Group } from '../../app/types/Group';
import { Graph } from '../../app/types/Graph';
import { selectModifiedGraph } from '../selectors/selectModifiedGraph';
import { selectGroups } from '../../app/store/selectors/selectGroups';
import { selectMaxGroupSize } from '../../app/store/selectors/selectMaxGroupSize';

@Component({
    selector: 'app-gc-container',
    template: `
        <app-block name="Graph">
            <div class="content" #content>
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
            </div>
        </app-block>
    `,
    styles: [
        `
            .content {
                height: 100%;
            }
        `,
    ],
})
export class GcContainerComponent implements AfterViewInit {
    @ViewChild('content') element: ElementRef;

    public readonly nodeRadius = 15;

    public height: number;
    public width: number;

    public graph$: Observable<Graph>;
    public groups$: Observable<Group[]>;
    public maxGroupSize$: Observable<number>;

    constructor(private readonly store: Store<AppState>) {
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
        this.height = this.element.nativeElement.clientHeight;
        this.width = this.element.nativeElement.clientWidth;
    }
}
