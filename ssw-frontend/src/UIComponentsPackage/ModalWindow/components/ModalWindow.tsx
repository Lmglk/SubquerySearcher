import React from 'react';
import { Block } from '../../Block';

import styles from './ModalWindow.module.css';
import { classList } from '../../common/classList';

type ModalWindowProps = {
    isOpen: boolean;
    children: React.ReactNode;
};

type ModalWindowState = {
    isFinishTransition: boolean;
};

export class ModalWindow extends React.PureComponent<ModalWindowProps, ModalWindowState> {
    public static readonly defaultProps: ModalWindowProps = {
        isOpen: false,
        children: null,
    };

    public originOverflowBehaviour: string | null = null;

    public readonly state: ModalWindowState = {
        isFinishTransition: false,
    };

    public componentDidMount(): void {
        this.originOverflowBehaviour = document.body.style.overflow;
    }

    public componentDidUpdate(prevProps: Readonly<ModalWindowProps>, prevState: Readonly<ModalWindowState>): void {
        if (this.props.isOpen) {
            document.body.style.overflow = 'hidden';

            setTimeout(
                () =>
                    this.setState({
                        isFinishTransition: true,
                    }),
                50
            );
        } else {
            document.body.style.overflow = this.originOverflowBehaviour;
            this.setState({
                isFinishTransition: false,
            });
        }
    }

    public render(): React.ReactNode {
        const { children, isOpen } = this.props;
        const { isFinishTransition } = this.state;

        if (isOpen === false) {
            return null;
        }

        return (
            <div
                className={classList({
                    [styles.overlay]: true,
                    [styles.overlayStartTransition]: isFinishTransition !== true,
                })}
            >
                <div
                    className={classList({
                        [styles.modalWrapper]: true,
                        [styles.startTransition]: isFinishTransition !== true,
                    })}
                >
                    <Block
                        style={{
                            width: '500px',
                            height: '150px',
                        }}
                    >
                        {children}
                    </Block>
                </div>
            </div>
        );
    }
}
