import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Login} from './login.jsx';
import {Admin} from './admin.jsx';
import {UserList} from './userlist.jsx';
import {Poll} from './mainpage.jsx';
import {Home} from './home.jsx';
import {Userpage} from './userpage.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

ReactDOM.render(
    <Router history={hashHistory}>
    <Route path='/' component={Poll}>
        <IndexRoute component={Login}/>
        <Route path='admin/' component={Admin}/>
        <Route path='admin/userlist/' component={UserList}/>
        <Route path='userpage/' component={Userpage}/>
        <Route path='home/' component={Home}/>
    </Route>
</Router>, document.querySelector("#myApp"));
