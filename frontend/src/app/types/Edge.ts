import { Node } from './Node';

export type Edge = {
    id: string;
    source: Node;
    target: Node;
    time: number;
};
