// Libraries
import React from 'react';
import PropTypes from 'prop-types';

const cn = require('classnames');

// Styles
import styles from './styles.module.scss';

export interface propsIcon {
    className?: string;
    type?: string,
    onClick?: React.MouseEventHandler<HTMLElement>,
    style?: React.CSSProperties;
    spin?: boolean;
}

function Icon(props: propsIcon) {
    // Props
    const {type = '', className = '', spin = false, ...attributes} = props;

    return (
        <div 
            {...attributes}
            style={{
                width: 'max-content', 
                display: 'flex'
            }} 
            className={cn({[styles.spin]: spin})}
        >
            <i className={cn(type, className, styles.icon)} style={props.style} />
        </div>
    );
}

Icon.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
};

Icon.defaultProps = {
    className: '',
    type: 'icon-error',
    style: {}
};

export default Icon;

