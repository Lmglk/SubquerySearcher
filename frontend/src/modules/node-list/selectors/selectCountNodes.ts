import { createSelector } from '@ngrx/store';
import { PartitionItem } from '../../app/interfaces/PartitionItem';
import { selectSeparateNodes } from '../../app/selectors/selectSeparateNodes';

export const selectCountNodes = createSelector(
    selectSeparateNodes,
    (separateNodes: PartitionItem[], prop: { id: string }) => {
        const node = separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0];
        return node ? node.count : 1;
    }
);
