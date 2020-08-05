import React, {useState} from 'react';
import './styles.less';
import {Button, Icon, notification} from '../components';

const App = () => {

    const onClick = () => {
        notification.success({
            title: 'Hello',
            duration: 0,
            placement: 'bottomLeft'
        });
    };

    return (
        <div style={{height: 10000}}>
            <Button onClick={onClick}>Button</Button>
            <Icon />
        </div>
    );
};

export default App;
