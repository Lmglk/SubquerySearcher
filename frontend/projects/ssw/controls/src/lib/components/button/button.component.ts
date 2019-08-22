import { Component, Input } from '@angular/core';

@Component({
    selector: 'ssw-button',
    template: `
        <button class="button" [ngClass]="styleType" [disabled]="disabled">
            <ng-content></ng-content>
        </button>
    `,
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input() public readonly styleType = 'basic';
    @Input() public readonly disabled = false;
}
