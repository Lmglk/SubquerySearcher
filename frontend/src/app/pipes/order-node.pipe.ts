import { Pipe, PipeTransform } from '@angular/core';
import { Node } from '../types/Node';

@Pipe({
    name: 'orderNode',
})
export class OrderNodePipe implements PipeTransform {
    transform(nodes: Node[], args?: any): Node[] {
        return nodes.sort((a, b) => parseInt(a.name) - parseInt(b.name));
    }
}
