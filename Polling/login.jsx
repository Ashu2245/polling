import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, link} from 'react-router';
import axios from "axios";

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.login = this.login.bind(this);
	}
	login(event) {
		var username = this.state.username;
		var password = this.state.password;
		event.preventDefault();
		return new Promise(function(resolve, reject) {
			return axios.get("http://144.76.34.244:8000/login?username=" + username + "&password=" + password).then((data) => {
				console.log(data);
				console.log(data.data.data.role, "LS");
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})

	}
	render() {
		return (
			<div className="col-sm-6 col-md-4 col-md-offset-4">
				<h1 className="text-center login-title">WELCOME TO LOGIN PAGE</h1>
				<div className="account-wall">
					<form className="form-signin" onSubmit={this.login}>
						<label >username:</label>
						<input onChange={(e) => {
							this.setState({username: e.target.value})
						}} type="text" value={this.state.username} id="email" className="form-control" placeholder="Enter Username"/>
						<label >Password:</label>
						<input onChange={(e) => {
							this.setState({password: e.target.value})
						}} type="password" value={this.state.password} id="pwd" className="form-control" placeholder="Enter password"/>
						<input className="btn btn-lg btn-primary btn-block" type="submit" value="LOGIN"/>
					</form>
				</div>

			</div>
		);
	}
}
