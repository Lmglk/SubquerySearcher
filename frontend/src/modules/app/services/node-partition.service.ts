import { Injectable } from '@angular/core';
import { PartitionItem } from '../interfaces/PartitionItem';
import { Graph } from '../interfaces/Graph';
import { GraphNode } from '../interfaces/GraphNode';
import { IdGeneratorService } from './id-generator.service';
import { GraphEdge } from '../interfaces/GraphEdge';

@Injectable({
    providedIn: 'root',
})
export class NodePartitionService {
    constructor(private readonly idGenerator: IdGeneratorService) {}

    public nodePartition(graph: Graph, partitionList: PartitionItem[]): Graph {
        const { nodes, edges } = graph;

        let tempNodes = nodes.map(node => ({ ...node }));
        let tempEdges = edges.map(edge => ({ ...edge }));

        partitionList
            .filter(item => item.count > 1)
            .forEach(item => {
                const currentNode: GraphNode = tempNodes.find(
                    node => node.id === item.nodeId
                );

                const inputEdges = tempEdges.filter(
                    edge => edge.targetId === item.nodeId
                );

                tempEdges = tempEdges.filter(
                    edge => edge.targetId !== item.nodeId
                );

                for (let i = 0; i < item.count; i++) {
                    const newNode: GraphNode = {
                        id: this.idGenerator.getID(),
                        name: `${currentNode.name}.${i + 1}`,
                        time: Math.ceil(currentNode.time / item.count),
                    };

                    const newEdge: GraphEdge = {
                        id: this.idGenerator.getID(),
                        sourceId: newNode.id,
                        targetId: currentNode.id,
                    };

                    tempNodes = [...tempNodes, newNode];
                    tempEdges = [...tempEdges, newEdge];

                    inputEdges.forEach(edge => {
                        tempEdges = [
                            ...tempEdges,
                            {
                                id: this.idGenerator.getID(),
                                sourceId: edge.sourceId,
                                targetId: newNode.id,
                            },
                        ];
                    });
                }

                tempNodes = tempNodes.map(currNode =>
                    currNode.id === currentNode.id
                        ? { ...currNode, time: 1 }
                        : currNode
                );
            });

        return {
            nodes: tempNodes,
            edges: tempEdges,
        };
    }
}
