import { Component, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { OptimizationMode } from '../../enums/OptimizationOptions';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { GraphChartService } from '../../../graph-chart/services/graph-chart.service';
import { UploadOriginalGraphAction } from '../../actions/UploadOriginalGraphAction';
import { getOptimizationMode } from '../../selectors/getOptimizationMode';
import { IRootState } from '../../interfaces/IRootState';
import { SetOptimizationModeAction } from '../../actions/SetOptimizationModeAction';
import { UploadReplicationTableAction } from '../../actions/UploadReplicationTableAction';

@Component({
    selector: 'ssw-header',
    template: `
        <div class="header">
            <div class="navigation">
                <ssw-tab
                    [active]="(activeTab$ | async) === optimizationMode.DEFAULT"
                    (onSelect)="handleSelectTab(optimizationMode.DEFAULT)"
                >
                    Default
                </ssw-tab>
                <ssw-tab
                    [active]="(activeTab$ | async) === optimizationMode.TIME"
                    (onSelect)="handleSelectTab(optimizationMode.TIME)"
                >
                    Width Optimization
                </ssw-tab>
                <ssw-tab
                    [active]="(activeTab$ | async) === optimizationMode.WIDTH"
                    (onSelect)="handleSelectTab(optimizationMode.WIDTH)"
                >
                    Time Optimization
                </ssw-tab>
            </div>
            <div class="content">
                <input type="file" #inputGraph (change)="changeGraphFile()" />
                <input
                    type="file"
                    #inputReplicationTable
                    (change)="changeReplicationTableFile()"
                />
                <button (click)="exportToFile()">Export</button>
            </div>
        </div>
    `,
    styles: [
        `
            .header {
                display: grid;
                height: 4.8rem;
                padding-left: 1.6rem;
                padding-right: 1.6rem;
                grid-gap: 1.6rem;
                grid-template-columns: auto 1fr;
                align-items: center;
                box-shadow: 0 0.1rem 0.1rem var(--color-shadow);
                background-color: var(--color-surface);
            }

            .content {
                display: grid;
                grid-gap: 1.6rem;
                grid-auto-flow: column;
                justify-content: left;
                align-items: center;
            }

            .navigation {
                display: grid;
                grid-auto-flow: column;
                height: 100%;
            }
        `,
    ],
})
export class HeaderComponent {
    public readonly optimizationMode = OptimizationMode;

    @ViewChild('inputGraph') public inputGraph: ElementRef;
    @ViewChild('inputReplicationTable')
    public inputReplicationTable: ElementRef;

    public activeTab$: Observable<OptimizationMode>;
    public selectedOptimizationOption: OptimizationMode;

    constructor(
        private readonly toastr: ToastrService,
        private readonly store: Store<IRootState>,
        private readonly graphChartService: GraphChartService
    ) {
        this.selectedOptimizationOption = OptimizationMode.DEFAULT;
        this.activeTab$ = this.store.pipe(select(getOptimizationMode));
    }

    public handleSelectTab(tab: OptimizationMode): void {
        this.store.dispatch(new SetOptimizationModeAction(tab));
    }

    public changeGraphFile(): void {
        const fileBrowser = this.inputGraph.nativeElement;
        const file = fileBrowser.files[0];

        if (file) {
            this.store.dispatch(new UploadOriginalGraphAction(file));
        } else {
            this.toastr.info('Please select a file');
        }
    }

    public changeReplicationTableFile(): void {
        const fileBrowser = this.inputReplicationTable.nativeElement;
        const file = fileBrowser.files[0];

        if (file) {
            this.store.dispatch(new UploadReplicationTableAction(file));
        } else {
            this.toastr.info('Please select a file');
        }
    }

    public exportToFile() {
        const source = this.graphChartService.getSVGText('chart');
        const fileName = 'chart.svg';
        const mimeType = 'image/svg+xml;charset=utf-8';

        const file = new File([source], fileName, {
            type: mimeType,
        });

        try {
            FileSaver.saveAs(file);
        } catch (e) {
            this.toastr.error('Export file failed');
        }
    }
}
