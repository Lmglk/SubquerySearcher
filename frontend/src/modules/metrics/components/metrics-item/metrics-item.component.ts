import { Component, Input } from '@angular/core';

@Component({
    selector: 'ssw-metrics-item',
    template: `
        <div class="item">
            <div class="title">{{ name }}:</div>
            <div class="value">{{ value }}</div>
        </div>
    `,
    styles: [
        `
            .item {
                display: grid;
                grid-auto-flow: column;
                width: max-content;
                grid-gap: 1rem;
            }

            .title {
                font-weight: bold;
            }

            .value {
                color: var(--color-accent);
                font-weight: bold;
            }
        `,
    ],
})
export class MetricsItemComponent {
    @Input() public name: string;
    @Input() public value: number;
}
