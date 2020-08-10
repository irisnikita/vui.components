// Libraries
import React from 'react';

const cn = require('classnames');

// Styles
import styles from './styles.module.scss';

// Types
type propsDivider = {
    style?: React.CSSProperties,
    placement?: 'left' | 'right' | 'center',
    children?: React.ReactNode | string | number;
    normal?: boolean;
    className?: string;
    styleDivider?: 'solid' | 'dashed' | 'dotted';
    color?: string;
    type?: 'vertical' | 'horizontal';
}

function Divider(props: propsDivider) {
    const {style = {}, placement = 'center', children, normal = false, className = '', type = 'horizontal', styleDivider = 'solid', color = '#bfbfbf'} = props;
    
    return (
        <>
            {!children ? (
                <div
                    style={{...style, borderStyle: styleDivider, borderColor: color}} 
                    className={
                        cn(styles['divider'], className, styles[type])
                    } 
                />
            ) :
                <div className={cn(styles['title-divider'], styles[placement])}>
                    <div className={cn(styles['title'], className, styles[styleDivider])} style={normal ? {...style, fontWeight: 'normal', fontSize: 14} : {...style}}>{children}</div>
                </div>
            }
        </>
    );
}

Divider.defaultProps = {
    style: {}
};

export default Divider;

