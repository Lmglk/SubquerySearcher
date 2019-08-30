import { GraphData } from './types/GraphData';
import { LineDirection } from '../Line/enums/LineDirection';

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
            sourceX: 500,
            sourceY: 200,
            targetX: 1000,
            targetY: 200,
            direction: LineDirection.FORWARD,
        },
        {
            id: 2,
            sourceX: 500,
            sourceY: 200,
            targetX: 850,
            targetY: 400,
            direction: LineDirection.BACK,
        },
        {
            id: 3,
            sourceX: 850,
            sourceY: 400,
            targetX: 1000,
            targetY: 200,
            direction: LineDirection.BIDIRECTIONAL,
        },
    ],
};
