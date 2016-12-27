import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import axios from "axios";
import styles from './index.scss';
import {CONFIG} from './config.jsx';

export class AddUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			role: "",
			input_wrong: "hide"
		}
		this.insertUser = this.insertUser.bind(this);
		this.User_info = this.User_info.bind(this);
		this.Add_can = this.Add_can.bind(this)
	}
	insertUser(e) {
		let username = this.state.username;
		let password = this.state.password;
		let role = this.state.role;
		console.log(role);
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "add_user?username=" + username + "&password=" + password + "&role=" + role).then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}
	User_info(e) {
		this.insertUser(e).then((val) => {
			console.log(add_error);
			var add_error = val.data.error;
			console.log(val);
			if (localStorage.getItem("role") != "admin") {
				this.props.router.push('/')
			} else if (add_error == 0) {
				this.props.router.push('admin/userlist/')
			} else {
				this.setState({username: "", password: "", role: "", input_wrong: "show"})
			}
		});
	}
	Add_can(props) {
		this.props.router.push('admin/');
		return;
	}
	render() {
		return (
			<div className={styles.login}>
				<div className=" col-md-3 col-md-offset-5">
					<div className="well well-lg">
						<h1 className="text-center login-title">
							<i className="fa fa-user-plus fa-3x" aria-hidden="true"></i>
						</h1>
						<form className="form-signin" onSubmit={this.User_info}>
							<label >Username:</label>
							<input onChange={(e) => {
								this.setState({username: e.target.value})
							}} type="text" value={this.state.username} id="email" className="form-control" placeholder="Enter Username"/>
							<label>Password:</label>
							<input onChange={(e) => {
								this.setState({password: e.target.value})
							}} type="password" value={this.state.password} className="form-control" placeholder="Enter Password"/>
							<label>Role:</label>
							<input onChange={(e) => {
								this.setState({role: e.target.value})
							}} type="text" value={this.state.role} className="form-control" placeholder="Enter Role of the user"/>
							<label></label>
							<input className="btn-success btn-lg btn-block " type="submit" value="ADD"/>
						</form>
						<label></label>
						<button className="btn-danger btn-lg btn-block " onClick={this.Add_can}>Cancel</button>
					</div>
					<div className={this.state.input_wrong}>
						<div className="alert alert-danger">
							<strong>Warning!</strong>
							Please enter correct username and password
						</div>
					</div>
				</div>
			</div>
		)
	}
}
