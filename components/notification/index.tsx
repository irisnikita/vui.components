// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import styles from './styles.module.scss';

export interface propsNotification {
    onClose: any;
    onMouseEnter: any;
    onMouseLeave: any;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    title?: string | React.ReactNode;
    type?: 'success' | 'info' | 'warning' | 'error' | 'default';
    description?: string | React.ReactNode;
    duration?: number;
    key?: string,
    button?: React.ReactNode;
}

export interface propsWrapper {
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    title?: string | React.ReactNode;
    type?: 'success' | 'info' | 'warning' | 'error' | 'default';
    description?: string | React.ReactNode;
    duration?: number;
    key?: string,
    button?: React.ReactNode;
}

function Notification(props: propsNotification) {
    const {title = 'Notification Title', button, type = 'default', description = 'This is a default description'} = props;

    const onClickClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const showRenderType = () => {
        switch (type) {
            case 'success':

                return <i style={{color: '#52c41a', fontSize: 32, marginRight: 10}} className='icon-check_circle_outline' />;
            case 'info':

                return <i style={{color: '#1890ff', fontSize: 32, marginRight: 10}} className='icon-info_outline' />;
            case 'warning':

                return <i style={{color: '#fadb14', fontSize: 32, marginRight: 10}} className='icon-circle_notifications' />;
            case 'error':

                return <i style={{color: '#f5222d', fontSize: 32, marginRight: 10}} className='icon-error_outline' />;
            case 'default':

                return null;

            default:
                return null;
        }
    };

    const onMouseEnter = () => {
        if (props.onMouseEnter) {
            props.onMouseEnter();
        }
    };

    const onMouseLeave = () => {
        if (props.onMouseLeave) {
            props.onMouseLeave();
        }
    };

    return (
        <div className={styles['notification-box']}>
            {showRenderType()}
            <div style={{width: '100%', paddingTop: 5}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div className={styles['flex']}>
                    <div className={styles['title']}>{title}</div>
                    <i onClick={onClickClose} className={`${styles['icon-close']} icon-clearclose`} style={{fontSize: 20, cursor: 'pointer'}} />
                </div>
                <div className={styles['description']} style={{marginBottom: 10}}>{description}</div>
                <div className={styles['footer']}>
                    {button ? button : null}
                </div>
            </div>
        </div>
    );
}

let containers: Array<any> = [];

const showNotification = (props: propsWrapper) => {
    const {placement = 'topRight', duration = 4000, key = ''} = props;

    if (!containers.some((container: { placement: any; }) => container.placement === placement)) {
        const element = document.createElement('div');

        element.classList.add(styles['list-notification']);

        element.classList.add(styles[placement]);

        document.body.appendChild(element);

        containers.push({placement, element: element});
    }

    const element = document.createElement('div');

    if (key !== '') {
        element.setAttribute('id', key);
    }

    if (placement === 'bottomRight' || placement === 'topRight') {
        element.style.right = '-500px';
    } else {
        element.style.left = '-500px';
    }

    element.classList.add(styles['wrapper-notification']);

    setTimeout(() => {
        if (placement === 'bottomRight' || placement === 'topRight') {
            element.style.right = '0px';
        } else {
            element.style.left = '0px';
        }
    }, 100);

    let timeout: any = null;

    const containerElement = containers.find((container: { placement: any; }) => container.placement === placement);

    if (containerElement && containerElement.element) {
        const onClose = () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            element.style.maxHeight = '0px';
            element.style.padding = '0px';

            setTimeout(() => {
                if (element) {
                    containerElement.element.removeChild(element);
                }
            }, 300);
        };

        const onMouseEnter = () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };

        const onMouseLeave = () => {
            if (duration !== 0) {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    element.style.maxHeight = '0px';
                    element.style.padding = '0px';

                    setTimeout(() => {
                        if (element) {
                            containerElement.element.removeChild(element);
                        }
                    }, 300);
                }, duration);
            }
        };

        ReactDOM.render(Notification({...props, onClose, onMouseEnter, onMouseLeave}), element, () => {

            containerElement.element.appendChild(element);

            if (duration !== 0) {
                timeout = setTimeout(() => {
                    element.style.maxHeight = '0px';
                    element.style.padding = '0px';

                    setTimeout(() => {
                        if (element) {
                            containerElement.element.removeChild(element);
                        }
                    }, 300);
                }, duration);
            }
        });
    }
};

export default class notification {

    static open = (props: propsWrapper): void => {
        showNotification(props);
    }

    static success = (props: propsWrapper): void => {
        showNotification({
            ...props,
            type: 'success'
        });
    }

    static info = (props: propsWrapper): void => {
        showNotification({
            ...props,
            type: 'info'
        });
    }

    static warning = (props: propsWrapper): void => {
        showNotification({
            ...props,
            type: 'warning'
        });
    }

    static error = (props: propsWrapper): void => {
        showNotification({
            ...props,
            type: 'error'
        });
    }

    static close = (key: string): void => {
        const element = document.getElementById(key);

        if (element) {
            const parent = element.parentElement;

            element.style.maxHeight = '0px';
            element.style.padding = '0px';

            setTimeout(() => {
                if (element && parent) {
                    parent.removeChild(element);
                }
            }, 300);
        }
    }
}

