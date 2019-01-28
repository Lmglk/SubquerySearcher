import { Component } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    public separatedNodeList: any;

    constructor() {
        this.separatedNodeList = 0;
    }

    private separateNodes(item) {
        // const targetNodes = this.modifiedGraph.getTargetEdges(item.id);
        // const sourceNodes = this.modifiedGraph.getSourceEdges(item.id);
        // this.modifiedGraph.removeNode(item.id);
        //
        // for (let i = 1; i <= item.count; i++) {
        //   const nodeName = `${item.id}.${i}`;
        //   this.modifiedGraph.addNode(nodeName);
        //
        //   targetNodes.forEach(targetNode =>
        //     this.modifiedGraph.addTargetEdge(nodeName, targetNode.target));
        //
        //   sourceNodes.forEach(sourceNode =>
        //     this.modifiedGraph.addSourceEdge(sourceNode.source, nodeName))
        // }
    }
}
