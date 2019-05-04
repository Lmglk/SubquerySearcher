import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
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

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
    @ViewChild('fileUpload') inputFile: ElementRef;

    public readonly optimizationOptions = OptimizationOptions;
    public selectedOptimizationOption: OptimizationOption;

    private file: File;
    private graphSubscription: Subscription;
    private separateNodeInfoSubscription: Subscription;

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

    public async calculateGraph(): Promise<void> {
        this.store.dispatch(new ResetModifiedGraphAction());
        this.store.dispatch(new ResetGroupsAction());
        this.store.dispatch(
            new CalculateGraphAction(this.selectedOptimizationOption)
        );
    }

    public ngOnDestroy(): void {
        this.graphSubscription.unsubscribe();
        this.separateNodeInfoSubscription.unsubscribe();
    }
}
