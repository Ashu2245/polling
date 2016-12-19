import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Login} from './component/login.jsx';
import {Userlist} from './component/userlist.jsx';
import {Poll} from './component/mainpage.jsx';
import {Home} from './component/home.jsx';
import {Userpage} from './component/userpage.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

ReactDOM.render(
	<Router history={hashHistory}>
	<Route path='/' component={Poll}>
		<IndexRoute component={Login}/>
		<Route path='globalnew/' component={UserList}/>
		<Route path='userpage/' component={Userpage}/>
		<Route path='home/' component={Home}/>
	</Route>
</Router>, document.querySelector("#myApp"));
