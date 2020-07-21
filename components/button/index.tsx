// Libraries
import React, { FunctionComponent, useState } from 'react'
import cn from 'classnames';
import PropTypes from 'prop-types'

// Utils
import { tuple } from '../_util/type';

// Styles
const styles = require('./styles.scss');

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];

export interface propsButton {
    type?: ButtonType,
    onClick?: React.MouseEventHandler<HTMLElement>,
    isActive?: Boolean,
    style?: React.CSSProperties;
}

const Button: FunctionComponent<propsButton> = (props) => {
    // Props
    const { type = 'default', children } = props;

    // State
    const [isActive, setActive] = useState(false);

    const onClickButton = (e: any) => {
        if (props.onClick) {
            props.onClick(e)
        }

        setActive(true)

        setTimeout(() => {
            setActive(false)
        }, 500);
    }

    return (
        <button
            className={cn(styles['btn'], styles[type], { [styles.active]: isActive })}
            onClick={onClickButton}
        >
            {children ? children : 'Button'}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func
}

Button.defaultProps = {
    type: 'default',
    style: {}
}

export default Button

