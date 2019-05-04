import {
    Component,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import autobind from 'autobind-decorator';
import { GraphChartNode } from '../../types/GraphChartNode';

@Component({
    selector: '[app-gc-node]',
    templateUrl: './gc-node.component.html',
    styleUrls: ['./gc-node.component.css'],
})
export class GcNodeComponent {
    @Input() node: GraphChartNode;
    @Input() radius: number;
    @Input() inactive: boolean;
    @Input() layoutHeight: number;
    @Input() layoutWidth: number;
    @Input() horizontalDragging: boolean;
    @Input() verticalDragging: boolean;

    @Output() move: EventEmitter<GraphChartNode>;
    @Output() select: EventEmitter<string>;

    private readonly document: Document;
    private startLayoutX: number;
    private startLayoutY: number;

    constructor(@Inject(DOCUMENT) document: Document) {
        this.move = new EventEmitter();
        this.select = new EventEmitter();
        this.document = document;
    }

    public handleClick() {
        this.select.emit(this.node.id);
    }

    @HostListener('mousedown', ['$event'])
    private handleMouseDown(event: MouseEvent) {
        if (this.horizontalDragging || this.verticalDragging) {
            this.startLayoutX = event.pageX - event.offsetX;
            this.startLayoutY = event.pageY - event.offsetY;
            this.document.addEventListener('mousemove', this.handleMouseMove);
            this.document.addEventListener('mouseup', this.handleMouseUp);
        }
    }

    @autobind
    private handleMouseMove(event: MouseEvent) {
        this.move.emit({
            ...this.node,
            x: this.horizontalDragging
                ? this.positionCorrection(
                      event.pageX - this.startLayoutX,
                      this.radius,
                      this.layoutWidth - this.radius
                  )
                : this.node.x,
            y: this.verticalDragging
                ? this.positionCorrection(
                      event.pageY - this.startLayoutY,
                      this.radius,
                      this.layoutHeight - this.radius * 2
                  )
                : this.node.y,
        });
    }

    @autobind
    private handleMouseUp() {
        this.document.removeEventListener('mousemove', this.handleMouseMove);
        this.document.removeEventListener('mouseup', this.handleMouseUp);
    }

    private positionCorrection(
        position: number,
        leftBorder: number,
        rightBorder: number
    ) {
        if (position < leftBorder) {
            return leftBorder;
        }

        if (position > rightBorder) {
            return rightBorder;
        }

        return position;
    }
}
