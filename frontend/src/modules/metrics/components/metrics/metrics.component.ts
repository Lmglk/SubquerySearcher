import { Component, Input } from '@angular/core';

@Component({
    selector: 'ssw-metrics',
    template: `
        <div class="grid">
            <ssw-metrics-item
                name="Total bubbles"
                [value]="totalBubbles"
            ></ssw-metrics-item>
            <ssw-metrics-item
                name="Hard bubbles"
                [value]="hardBubbles"
            ></ssw-metrics-item>
            <ssw-metrics-item
                name="Nodes"
                [value]="numberOfNodes"
            ></ssw-metrics-item>
            <ssw-metrics-item name="Height" [value]="height"></ssw-metrics-item>
            <ssw-metrics-item name="Width" [value]="width"></ssw-metrics-item>
            <ssw-metrics-item name="Time" [value]="time"></ssw-metrics-item>
        </div>
    `,
    styles: [
        `
            .grid {
                display: grid;
                grid-auto-flow: column;
                width: max-content;
                grid-gap: 5rem;
            }
        `,
    ],
})
export class MetricsComponent {
    @Input() public totalBubbles: number;
    @Input() public hardBubbles: number;
    @Input() public numberOfNodes: number;
    @Input() public height: number;
    @Input() public width: number;
    @Input() public time: number;
}
