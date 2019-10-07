import { GraphNode } from '../GraphChartLayout/types/GraphNode';
import { GraphLink } from '../GraphChartLayout/types/GraphLink';

export function requestGraphDataAdapter(nodes: GraphNode[], links: GraphLink[]) {
    const convertedNodes = nodes.map(node => {
        return {
            id: node.id,
            name: node.name,
            time: node.time,
        };
    });

    const convertedEdges = links.map(link => {
        const sourceNode = convertedNodes.find(node => node.id === link.sourceId);
        const targetNode = convertedNodes.find(node => node.id === link.targetId);

        if (sourceNode === undefined || targetNode === undefined) {
            throw new Error('Node not found');
        }

        return {
            id: link.id,
            source: sourceNode,
            target: targetNode,
        };
    });

    return {
        nodes: convertedNodes,
        edges: convertedEdges,
    };
}
