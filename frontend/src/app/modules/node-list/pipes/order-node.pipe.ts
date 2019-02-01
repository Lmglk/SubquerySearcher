import { Pipe, PipeTransform } from '@angular/core';
import { GraphNode } from '../../../types/GraphNode';

@Pipe({
    name: 'orderNode',
})
export class OrderNodePipe implements PipeTransform {
    transform(nodes: GraphNode[]): GraphNode[] {
        return nodes.sort(
            (a, b) => parseInt(a.name, 10) - parseInt(b.name, 10)
        );
    }
}
