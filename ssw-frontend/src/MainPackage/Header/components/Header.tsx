import React from 'react';

import { Block } from '../../../UIComponentsPackage/Block';

import styles from './Header.module.css';
import { Button } from '../../../UIComponentsPackage/Button';
import autobind from 'autobind-decorator';
import { graphData } from '../../GraphChartLayout/components/graphData';
import { GraphData } from '../../../ChartPackage/GraphChart';

type Props = {
    uploadFile: (data: GraphData) => void;
};

type State = {};

export class Header extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return (
            <Block>
                <div className={styles.grid}>
                    <Button onClick={this.handleUploadFile}>Upload file</Button>
                </div>
            </Block>
        );
    }

    @autobind
    private handleUploadFile() {
        const { uploadFile } = this.props;

        uploadFile(graphData);
    }
}
