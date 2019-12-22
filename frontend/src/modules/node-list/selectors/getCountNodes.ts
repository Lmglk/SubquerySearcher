import { createSelector } from '@ngrx/store';
import { PartitionItem } from '../../app/interfaces/PartitionItem';
import { getPartitionList } from '../../app/selectors/getPartitionList';

export const getCountNodes = createSelector(
    getPartitionList,
    (separateNodes: PartitionItem[], prop: { id: string }) => {
        const node = separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0];
        return node ? node.count : 1;
    }
);
