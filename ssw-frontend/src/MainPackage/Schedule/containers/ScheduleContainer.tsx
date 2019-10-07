import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/AppState';
import { getNumberOfGroups } from '../selectors/getNumberOfGroups';
import ScheduleGroupContainer from './ScheduleGroupContainer';

import styles from './ScheduleContainer.module.css';

export type Props = {
    numberOfGroups: number;
};

type State = {};

class ScheduleContainer extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        const { numberOfGroups } = this.props;

        let groupElements: React.ReactNode[] = [];
        for (let i = 0; i < numberOfGroups; i++) {
            groupElements = [...groupElements, <ScheduleGroupContainer key={i} groupIndex={i} />];
        }

        return <div className={styles.schedule}>{groupElements}</div>;
    }
}

const mapStateToProps = (state: AppState) => ({
    numberOfGroups: getNumberOfGroups(state),
});

export default connect(
    mapStateToProps,
    null
)(ScheduleContainer);
