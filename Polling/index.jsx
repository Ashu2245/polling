import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Login} from './login.jsx';
import {Dashboard} from './dashboard.jsx';
import {GlobalNav} from './globalnav.jsx';
import {Poll} from './mainpage.jsx';
import {Home} from './home.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

ReactDOM.render(
	<Router history={hashHistory}>
	<Route path='/' component={Poll}>
		<IndexRoute component={Login}/>
		<Route path='globalnew/' component={GlobalNav}/>
		<Route path='home/' component={Home}/>
		<Route path='dashboard/' component={Dashboard}/>
	</Route>
</Router>, document.querySelector("#myApp"));
