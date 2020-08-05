// Libraries
import React, {useState} from 'react';

const cn = require('classnames');

import styles from './styles.module.scss';

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
export type SizeType = 'small' | 'middle' | 'large';
export type ShapeType = 'circle' | 'round' | 'square';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface propsButton {
    className?: string;
    type?: ButtonType,
    onClick?: React.MouseEventHandler<HTMLElement>,
    isActive?: boolean,
    style?: React.CSSProperties;
    danger?: boolean;
    children?: React.ReactNode;
    disable?: true;
    icon?: React.ReactNode;
    size?: SizeType;
    shape?: ShapeType;
    block?: boolean;
    loading?: boolean;
    href?: string;
    htmlType?: ButtonHTMLType
}

const Button = (props: propsButton) => {
    // State
    const [isActive, setActive] = useState(false);

    // Props
    const {type = 'default', htmlType = 'button', style = {}, danger = false, loading = false, disable = false, className = '', size = 'middle', shape = 'square', block = false} = props;

    const onClickButton = (e: any) => {

        if (props.onClick) {
            props.onClick(e);
        }

        setActive(true);

        setTimeout(() => {
            setActive(false);
        }, 200);
    };

    return (
        <button
            disabled={disable}
            className={cn(
                className,
                styles['btn'],
                styles[shape],
                styles[type],
                {
                    [styles.active]: isActive,
                    [styles.danger]: danger,
                    [styles.disable]: disable,
                    [styles['no-event']]: loading,
                    [styles.block]: block,
                    [styles[size]]: typeof size !== 'number'
                }
            )}
            style={style}
            onClick={onClickButton}
            type={htmlType}
        >
            {loading ? (
                <>
                    <div className={styles['wrap-loading']} />
                    <div className={`${styles.loading} icon-spinner2`} />
                </>
            ) : null}
            {props.icon && !loading ? props.icon : null}
            {props.children &&
                <div style={{marginLeft: props.icon || props.loading ? 5 : 0, width: 'max-content'}}>
                    {props.children}
                </div>
            }
        </button >
    );
};

export default Button;

