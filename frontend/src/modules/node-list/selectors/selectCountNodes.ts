import { createSelector } from '@ngrx/store';
import { InfoSeparate } from '../../app/interfaces/InfoSeparate';
import { selectSeparateNodes } from '../../app/selectors/selectSeparateNodes';

export const selectCountNodes = createSelector(
    selectSeparateNodes,
    (separateNodes: InfoSeparate[], prop: { id: string }) => {
        const node = separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0];
        return node ? node.count : 1;
    }
);
