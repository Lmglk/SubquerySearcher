import { createSelector } from '@ngrx/store';
import { selectSeparateNodes } from '../../app/store/selectors/selectSeparateNodes';
import { InfoSeparate } from '../../app/interfaces/InfoSeparate';

export const selectCountNodes = createSelector(
    selectSeparateNodes,
    (separateNodes: InfoSeparate[], prop: { id: string }) => {
        const node = separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0];
        return node ? node.count : 1;
    }
);
