import React from 'react';
import './styles.less';
import {Button, Divider, Icon, notification} from '../components';

const App = () => {

    const onClick = () => {
        notification.warning({
            title: 'Hello',
            placement: 'bottomLeft'
        });
    };

    return (
        <div style={{height: 10000}}>
            <Button onClick={onClick}>Button</Button>
            <div style={{display: 'flex', alignItems: 'center'}}>
                Hello
                <Divider placement='left' type='vertical'  />
                Tại anh
                <Divider placement='left' type='vertical' />
            </div>
            <Icon />
        </div>
    );
};

export default App;
