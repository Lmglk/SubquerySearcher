import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../types/AppState';
import { ToastrService } from 'ngx-toastr';
import {
    OptimizationOption,
    OptimizationOptions,
} from '../../enums/OptimizationOptions';
import { Subscription } from 'rxjs';
import { UploadGraphAction } from '../../store/actions/UploadGraphAction';
import { ResetModifiedGraphAction } from '../../store/actions/ResetModifiedGraphAction';
import { CalculateGraphAction } from '../../store/actions/CalculateGraphAction';
import { ResetGroupsAction } from '../../store/actions/ResetGroupsAction';
import * as FileSaver from 'file-saver';
import { GraphChartService } from '../../../graph-chart/services/graph-chart.service';

@Component({
    selector: 'ssw-header',
    template: `
        <div class="header">
            <div class="content">
                <input type="file" #fileUpload (change)="changeFile()" />
                <button (click)="uploadFile()">Upload file</button>
                <select (change)="changeOptimizationOption($event)">
                    <option
                        *ngFor="let option of optimizationOptions"
                        [value]="option"
                    >
                        {{ option }}
                    </option>
                </select>
                <button (click)="calculateGraph()">Calculate</button>
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
                grid-auto-flow: column;
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
        `,
    ],
})
export class HeaderComponent implements OnDestroy {
    @ViewChild('fileUpload', { static: false }) inputFile: ElementRef;

    public readonly optimizationOptions = OptimizationOptions;
    public selectedOptimizationOption: OptimizationOption;

    private file: File;
    private graphSubscription: Subscription;
    private separateNodeInfoSubscription: Subscription;

    constructor(
        private readonly toastr: ToastrService,
        private readonly store: Store<AppState>,
        private readonly graphChartService: GraphChartService
    ) {
        this.selectedOptimizationOption = OptimizationOption.NO_OPTIMIZATION;
    }

    public changeFile(): void {
        const fileBrowser = this.inputFile.nativeElement;
        this.file = fileBrowser.files[0];
    }

    public uploadFile(): void {
        if (this.file) {
            this.store.dispatch(new UploadGraphAction(this.file));
        } else {
            this.toastr.info('Please select a file');
        }
    }

    public changeOptimizationOption(event: Event) {
        this.selectedOptimizationOption = (event.target as HTMLSelectElement)
            .value as OptimizationOption;
    }

    public calculateGraph(): void {
        this.store.dispatch(new ResetModifiedGraphAction());
        this.store.dispatch(new ResetGroupsAction());
        this.store.dispatch(
            new CalculateGraphAction(this.selectedOptimizationOption)
        );
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

    public ngOnDestroy(): void {
        this.graphSubscription.unsubscribe();
        this.separateNodeInfoSubscription.unsubscribe();
    }
}
