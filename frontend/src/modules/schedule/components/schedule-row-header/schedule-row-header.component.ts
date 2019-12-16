import { Component, Input } from '@angular/core';

@Component({
    selector: 'ssw-schedule-row-header',
    template: `
        <div>
            <div
                class="sequence"
                *ngFor="let header of headers; trackBy: trackByFn"
            >
                {{ header }}
            </div>
            <div class="title">№</div>
        </div>
    `,
    styles: [
        `
            .title,
            .sequence {
                display: grid;
                align-items: center;
                justify-items: center;
                height: 32px;
                border: 1px solid var(--color-border);
                font-weight: bold;
            }

            .sequence {
                border-bottom: none;
                border-right: none;
            }

            .title {
                border-right: none;
            }
        `,
    ],
})
export class ScheduleRowHeaderComponent {
    @Input() headers: string[];

    public trackByFn(index: number): number {
        return index;
    }
}
