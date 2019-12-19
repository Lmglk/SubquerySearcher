import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ssw-tab',
    template: `
        <div
            class="tab"
            [class.active]="active"
            [class.disabled]="disabled"
            (click)="handleSelect()"
        >
            <div class="title">
                <ng-content></ng-content>
            </div>
            <div class="indicator"></div>
        </div>
    `,
    styles: [
        `
            .tab {
                position: relative;
                display: grid;
                align-items: center;
                height: 100%;
                cursor: default;
            }

            .title {
                padding: 0 3rem;
                text-align: center;
                font-weight: bold;
                transition: color .2s ease;
            }

            .active .title,
            .title:hover {
                color: var(--color-text-black);
            }

            .indicator {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
            }

            .active .indicator {
                height: 0.5rem;
                background-color: var(--color-accent);
                border-radius: 0.2rem;
        `,
    ],
})
export class TabComponent {
    @Input() public active: boolean;
    @Input() public disabled: boolean;

    @Output() public onSelect: EventEmitter<void> = new EventEmitter();

    public handleSelect(): void {
        this.onSelect.emit();
    }
}
