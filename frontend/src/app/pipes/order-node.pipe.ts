import { Pipe, PipeTransform } from '@angular/core';
import {Node} from "../types/node";

@Pipe({
  name: 'orderNode'
})
export class OrderNodePipe implements PipeTransform {

  transform(nodes: Node[], args?: any): Node[] {
    return nodes.sort((a, b) => parseInt(a.label) - parseInt(b.label));
  }

}
