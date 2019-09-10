import { GraphData } from '../../../ChartPackage/GraphChart/types/GraphData';

export const graphData: GraphData = {
    nodes: [
        {
            id: 1,
            x: 500,
            y: 200,
            label: '1',
        },
        {
            id: 2,
            x: 1000,
            y: 200,
            label: '2',
        },
        {
            id: 3,
            x: 850,
            y: 400,
            label: '3',
        },
        {
            id: 4,
            x: 250,
            y: 100,
            label: '4',
        },
        {
            id: 5,
            x: 450,
            y: 300,
            label: '5',
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
        {
            id: 4,
            sourceId: 1,
            targetId: 4,
        },
        {
            id: 5,
            sourceId: 4,
            targetId: 5,
        },
        {
            id: 6,
            sourceId: 5,
            targetId: 3,
        },
    ],
};
