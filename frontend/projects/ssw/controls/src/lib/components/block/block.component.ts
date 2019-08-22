import { Component } from '@angular/core';

@Component({
    selector: 'ssw-block',
    template: `
        <div class="block"><ng-content></ng-content></div>
    `,
    styles: [
        `
            .block {
                display: inline-block;
                height: inherit;
                width: inherit;
                padding: 1.6rem;
                border-radius: 0.3rem;
                background-color: var(--color-surface);
                box-sizing: border-box;
                box-shadow: 0 0.4rem 0.4rem var(--color-shadow);
            }
        `,
    ],
})
export class BlockComponent {}
