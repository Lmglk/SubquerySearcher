import React, { ReactNode } from 'react';

export type ArrowMarkerProps = {
    offsetStartMarker: number;
    offsetEndMarker: number;
};

type ArrowMarkerDefsState = {};

export class ArrowMarkerDefs extends React.PureComponent<ArrowMarkerProps, ArrowMarkerDefsState> {
    static readonly defaultProps: ArrowMarkerProps = {
        offsetStartMarker: 0,
        offsetEndMarker: 0,
    };

    public render(): ReactNode {
        const { offsetStartMarker, offsetEndMarker } = this.props;

        return (
            <React.Fragment>
                <marker
                    id="markerStart"
                    viewBox="0 -5 10 10"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto"
                    refX={1 - offsetStartMarker}
                >
                    <path d="M10,5L0,0L10,-5" />
                </marker>

                <marker
                    id="markerEnd"
                    viewBox="0 -5 10 10"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto"
                    refX={9 + offsetEndMarker}
                >
                    <path d="M0,5L10,0L0,-5" />
                </marker>
            </React.Fragment>
        );
    }
}
