import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Login} from './login.jsx';
import {Admin} from './admin.jsx';
import {UserList} from './userlist.jsx';
import {Poll} from './mainpage.jsx';
import {Pollview} from './pollview.jsx';
import {Addpoll} from './addpoll.jsx'
import {AddUser} from './adduser.jsx';
import {Userpage} from './userpage.jsx';
import {Profile} from './dashboard.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

ReactDOM.render(
	<Router history={hashHistory}>
	<Route path='/' component={Poll}>
		<IndexRoute component={Login}/>
		<Route path='admin/' component={Admin}/>
		<Route path='admin/userlist/' component={UserList}/>
		<Route path='admin/adduser/' component={AddUser}/>
		<Route path='admin/pollview/' component={Pollview}/>
		<Route path='admin/pollview/addpoll/' component={Addpoll}/>
		<Route path='admin/profile/' component={Profile}/>
		<Route path='userpage/' component={Userpage}/>
	</Route>
</Router>, document.querySelector("#myApp"));
