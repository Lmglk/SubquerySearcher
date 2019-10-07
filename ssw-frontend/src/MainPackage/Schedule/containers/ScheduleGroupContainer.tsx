import React from 'react';
import { connect } from 'react-redux';
import { Group } from '../../types/Group';
import { AppState } from '../../types/AppState';
import { getGroupByIndex } from '../selectors/getGroupByIndex';
import { getMaxNumberOfSequences } from '../selectors/getMaxNumberOfSequences';
import ScheduleSequenceContainer from './ScheduleSequenceContainer';

import styles from './ScheduleGroupContainer.module.css';

type Props = {
    groupIndex: number;
    group: Group;
    maxNumberOfSequences: number;
};

type State = {};

class ScheduleGroupContainer extends React.PureComponent<Props, State> {
    static readonly defaultProps = {
        group: undefined,
        maxNumberOfSequences: 0,
    };

    public render(): React.ReactNode {
        const { groupIndex, group, maxNumberOfSequences } = this.props;
        const numberOfEmptyCells = maxNumberOfSequences - group.sequences.length;

        const emptyCellElements = Array.from(Array(numberOfEmptyCells), (value, index) => {
            return <div className={styles.item} key={index} />;
        });

        const sequenceElements = group.sequences.map(sequence => {
            return (
                <div className={styles.item} key={sequence.id}>
                    <ScheduleSequenceContainer nodeIds={sequence.nodes} />
                </div>
            );
        });

        return (
            <div>
                {emptyCellElements}
                {sequenceElements}
                <div className={styles.item}>{`Group ${groupIndex}`}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => ({
    ...props,
    group: getGroupByIndex(state, props.groupIndex),
    maxNumberOfSequences: getMaxNumberOfSequences(state),
});

export default connect(mapStateToProps)(ScheduleGroupContainer);
