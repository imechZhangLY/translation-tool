/**
 * @file 应用文件
 * @author zhangluyao
 */
import * as React from 'react';
import {Layout} from 'antd';
import {Redirect, Route, Switch, withRouter, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import 'antd/dist/antd.css';

import Home from './pages/Home';
import Tool from './pages/Tool';
import avatar from './static/images/avatar.jpeg';

const {createContext, useState, useMemo} = React;
const {Header, Content, Footer} = Layout;
const history = createBrowserHistory({
    basename: process.env.NODE_ENV === 'development' ? '/' : '/output'
});

const defaultContext = {
    text: '',
    changeText: (text: string) => {}
};

export const TextContext = createContext(defaultContext);

export default () => {
    const [state, setState] = useState('');

    const changeText = text => setState(text);

    return (
        <Layout className="layout">
            <Header>
                <div className="title">
                    <img className="avatar" src={avatar} />
                    英语生活号——翻译小助手
                </div>
            </Header>
            <Content>
                <div className="main">
                    <TextContext.Provider value={{
                        text: state,
                        changeText
                    }}>
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route exact path="/tool">
                                    <Tool />
                                </Route>
                            </Switch>
                        </Router>
                    </TextContext.Provider>
                </div>
            </Content>
            <Footer>
                Translate Tools ©2020 Created by 英语生活号
            </Footer>
        </Layout>
    )
};
