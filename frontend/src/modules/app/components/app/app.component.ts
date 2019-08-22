import { Component } from '@angular/core';

@Component({
    selector: 'ssw-root',
    template: `
        <div class="page">
            <ssw-header></ssw-header>

            <div class="content">
                <ssw-gc-container class="graph"></ssw-gc-container>
                <ssw-schedule-container
                    class="schedule"
                ></ssw-schedule-container>
                <ssw-node-list-container
                    class="nodes"
                ></ssw-node-list-container>
                <ssw-metrics-container class="metrics"></ssw-metrics-container>
            </div>
        </div>
    `,
    styles: [
        `
            .page {
                display: grid;
                height: 100%;
                grid-gap: 1.6rem;
                grid-template-rows: auto 1fr;
                background-color: var(--color-background);
                color: var(--color-text);
                overflow: hidden;
            }

            .content {
                display: grid;
                grid-gap: 1.6rem;
                padding: 0 1.6rem 1.6rem;
                grid-template-columns: 4fr 1fr;
                grid-template-rows: 2fr 1fr auto;
                grid-template-areas:
                    'graph nodes'
                    'schedule nodes'
                    'metrics metrics';
                overflow: auto;
            }

            .graph {
                grid-area: graph;
            }

            .schedule {
                grid-area: schedule;
            }

            .nodes {
                grid-area: nodes;
            }

            .metrics {
                grid-area: metrics;
            }
        `,
    ],
})
export class AppComponent {}
