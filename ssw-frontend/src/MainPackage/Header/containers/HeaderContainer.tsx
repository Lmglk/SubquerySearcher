import React from 'react';
import { Header } from '../components/Header';

type Props = {};

type State = {};

export class HeaderContainer extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return <Header uploadFile={this.uploadFile} />;
    }

    private async uploadFile(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/graph/loadGraph', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);
    }
}
