/**
 * @file 主页面
 * @author zhangluyao
 */
import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Input, Button} from 'antd';

import {setLocalStorage} from '../../utils';
import {TextContext} from '../../App';

const {useState, useContext} = React;
const {TextArea} = Input;

const Home = (props: RouteComponentProps) => {
    const [value, setValue] = useState('');
    const {changeText} = useContext(TextContext);

    const handleConfirm = () => {
        changeText(value);
        setLocalStorage(value);
        props.history.push('/tool');
    }

    const handleClear = () => {
        setValue('');
    }

    return (
        <div className="home">
            <TextArea
                placeholder="…the unknown is always more fascinating than the known."
                allowClear={true}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <Button type="primary" onClick={handleConfirm}>翻译</Button>
            <Button type="danger" onClick={handleClear}>清除</Button>
        </div>
    )
};

export default withRouter(Home);
