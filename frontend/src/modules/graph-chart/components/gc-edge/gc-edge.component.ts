import { Component, Input } from '@angular/core';

@Component({
    selector: '[app-gc-edge]',
    templateUrl: './gc-edge.component.html',
    styleUrls: ['./gc-edge.component.css'],
})
export class GcEdgeComponent {
    @Input() x1: number;
    @Input() y1: number;
    @Input() x2: number;
    @Input() y2: number;
    @Input() nodeRadius: number;
    @Input() inactive: boolean;

    public getMarker() {
        return this.inactive ? 'url(#marker-inactive)' : 'url(#marker-active)';
    }
}
