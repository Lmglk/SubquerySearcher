import { Graph } from '../types/Graph';

export const graphData: Graph = {
    nodes: [
        {
            id: 1,
            x: 500,
            y: 200,
            name: '1',
            time: 1,
        },
        {
            id: 2,
            x: 1000,
            y: 200,
            name: '2',
            time: 1,
        },
        {
            id: 3,
            x: 850,
            y: 400,
            name: '3',
            time: 1,
        },
        {
            id: 4,
            x: 250,
            y: 100,
            name: '4',
            time: 1,
        },
        {
            id: 5,
            x: 450,
            y: 300,
            name: '5',
            time: 1,
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
