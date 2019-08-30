import { GraphData } from './types/GraphData';

export const graphData: GraphData = {
    nodes: [
        {
            id: 1,
            x: 500,
            y: 200,
            radius: 15,
            label: '1',
        },
        {
            id: 2,
            x: 1000,
            y: 200,
            radius: 15,
            label: '2',
        },
        {
            id: 3,
            x: 850,
            y: 400,
            radius: 15,
            label: '3',
        },
    ],
    links: [
        {
            id: 1,
            sourceId: 1,
            targetId: 2,
        },
        {
            id: 2,
            sourceId: 1,
            targetId: 3,
        },
        {
            id: 3,
            sourceId: 3,
            targetId: 2,
        },
    ],
};
