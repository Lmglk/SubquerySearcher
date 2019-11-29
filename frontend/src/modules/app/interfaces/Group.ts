import { Sequence } from './Sequence';

export interface Group {
    id: string;
    sequences: Sequence[];
    time: number;
}
