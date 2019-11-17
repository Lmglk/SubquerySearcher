import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectModifiedGraph } from '../selectors/selectModifiedGraph';
import { Graph } from '../../app/interfaces/Graph';
import { Group } from '../../app/interfaces/Group';
import { AppState } from '../../app/interfaces/AppState';
import { selectGroups } from '../../app/selectors/selectGroups';
import { selectMaxGroupSize } from '../../app/selectors/selectMaxGroupSize';

@Component({
    selector: 'ssw-gc-container',
    template: `
        <ssw-block class="block">
            <div class="content" #content>
                <ssw-free-placement-container
                    *ngIf="(groups$ | async).length === 0"
                    [graph]="graph$ | async"
                    [nodeRadius]="nodeRadius"
                    [height]="height"
                    [width]="width"
                ></ssw-free-placement-container>

                <ssw-gc-sequence-placement-container
                    *ngIf="(groups$ | async).length !== 0"
                    [graph]="graph$ | async"
                    [nodeRadius]="nodeRadius"
                    [height]="height"
                    [width]="width"
                    [groups]="groups$ | async"
                    [maxGroupSize]="maxGroupSize$ | async"
                ></ssw-gc-sequence-placement-container>
            </div>
        </ssw-block>
    `,
    styles: [
        `
            .block {
                height: 100%;
                width: 100%;
            }

            .content {
                height: 100%;
            }
        `,
    ],
})
export class GcContainerComponent implements AfterViewInit {
    @ViewChild('content', { static: false }) element: ElementRef;

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
    public handleResize() {
        this.getContentSize();
    }

    private getContentSize() {
        this.height = this.element.nativeElement.clientHeight;
        this.width = this.element.nativeElement.clientWidth;
    }
}
