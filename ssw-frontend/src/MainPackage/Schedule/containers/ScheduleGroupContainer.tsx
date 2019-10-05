import React from 'react';
import { connect } from 'react-redux';
import { Group } from '../../types/Group';
import { AppState } from '../../types/AppState';
import { ScheduleGroup } from '../components/ScheduleGroup';
import { getGroupByIndex } from '../selectors/getGroupByIndex';

type Props = {
    groupIndex: number;
    group: Group;
};

type State = {};

class ScheduleGroupContainer extends React.PureComponent<Props, State> {
    static readonly defaultProps = {
        group: undefined,
    };

    public render(): React.ReactNode {
        const { groupIndex, group } = this.props;

        return (
            <div>
                <ScheduleGroup groupIndex={groupIndex} group={group} />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => ({
    ...props,
    group: getGroupByIndex(state, props.groupIndex),
});

export default connect(mapStateToProps)(ScheduleGroupContainer);
