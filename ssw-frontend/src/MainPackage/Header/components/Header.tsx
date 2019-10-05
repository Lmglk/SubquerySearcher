import React, { RefObject } from 'react';
import autobind from 'autobind-decorator';

import { Block } from '../../../UIComponentsPackage/Block';
import { Button } from '../../../UIComponentsPackage/Button';

import styles from './Header.module.css';

type Props = {
    uploadFile: (file: File) => void;
    calculateGraph: () => void;
};

type State = {};

export class Header extends React.PureComponent<Props, State> {
    private inputRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    public render(): React.ReactNode {
        return (
            <Block>
                <div className={styles.grid}>
                    <input type="file" ref={this.inputRef} />
                    <Button onClick={this.handleUploadFile}>Upload file</Button>
                    <Button onClick={this.calculateGraph}>Calculate</Button>
                </div>
            </Block>
        );
    }

    @autobind
    private handleUploadFile(): void {
        const inputElement: HTMLInputElement | null = this.inputRef.current;

        if (inputElement === null || inputElement.files === null) {
            throw new Error('HTMLInputElement does not exist');
        }

        const { uploadFile } = this.props;

        const file: File = inputElement.files[0];
        uploadFile(file);
    }

    @autobind
    private calculateGraph(): void {
        this.props.calculateGraph();
    }
}
