import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, link} from 'react-router';
import axios from "axios";
import styles from './index.scss';
import classNames from 'classnames';
import {CONFIG} from './config.jsx';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			input_wrong: "hide"
		};
		this.login = this.login.bind(this);
		this.login_user = this.login_user.bind(this);
	}
	login(event) {
		event.preventDefault();
		var username = this.state.username;
		var password = this.state.password;
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "login?username=" + username + "&password=" + password).then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}
	login_user(e) {
		this.login(e).then((val) => {
			var user = val.data.data.role;
			var user_err = val.data.error;
			if (user == "admin") {
				localStorage.setItem('role', 'admin');
				this.props.router.push("admin/");
			} else if (user_err == 0) {
				localStorage.setItem('role', 'user');
				this.props.router.push("userpage/");
			} else {
				this.setState({username: '', password: '', input_wrong: "show"});
			}
		});
	}
	render() {
		return (
			<div className={styles.login}>
				<div className=" col-md-3 col-md-offset-5">
					<div className="well well-lg">
						<h1 className="text-center login-title">
							<i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
						</h1>
						<div className="account-wall">
							<form className="form-signin has-feedback" onSubmit={this.login_user}>
								<label >Username:</label>
								<input onChange={(e) => {
									this.setState({username: e.target.value})
								}} type="text" value={this.state.username} id="email" className="form-control" required placeholder="Enter Username"/>
								<label >Password:</label>
								<input onChange={(e) => {
									this.setState({password: e.target.value})
								}} type="password" value={this.state.password} id="pwd" className="form-control" required placeholder="Enter password"/>
								<label></label>
								<input className="btn btn-lg btn-success btn-block" type="submit" value="LOGIN"/>
							</form>
						</div>
					</div>
					<div className={this.state.input_wrong}>
						<div className="alert alert-danger">
							<strong>WARNING!!!!</strong>
							PLEASE CHECK YOUR USERNAME AND PASSWORD!!!!
						</div>
					</div>
				</div>
			</div>
		);
	}
}
