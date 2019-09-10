import { LineDirection } from '../../Line/enums/LineDirection';

export type GraphLinkType = {
    id: number;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    direction: LineDirection;
};
