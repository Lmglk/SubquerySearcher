import React from 'react';
import { Group } from '../../types/Group';
import ScheduleSequenceContainer from '../containers/ScheduleSequenceContainer';

import styles from './ScheduleGroup.module.css';

type Props = {
    groupIndex: number;
    group: Group;
};

type State = {};

export class ScheduleGroup extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        const { group, groupIndex } = this.props;

        const sequenceElements = group.sequences.map(sequence => {
            return (
                <div className={styles.item} key={sequence.id}>
                    <ScheduleSequenceContainer nodeIds={sequence.nodes} />
                </div>
            );
        });

        return (
            <React.Fragment>
                {sequenceElements}
                <div className={styles.item}>{`Group ${groupIndex}`}</div>
            </React.Fragment>
        );
    }
}
