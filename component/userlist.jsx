import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {UserItemList} from './useritemlist.jsx';
import axios from "axios";
import {Router, Route, Link} from 'react-router'

export class UserList extends React.Component {
	constructor(props) {
		super(props)
		this.userlist = this.userlist.bind(this);
		this.get_userlist = this.get_userlist.bind(this);
	}
	logout() {
		this.props.router.push("/")
	}
	// userlist(e) {
	// 	e.preventDefault();
	// 	return new Promise(function(resolve, reject) {
	// 		return axios.get("http://144.76.34.244:8000/list_users").then((data) => {
	// 			resolve(data)
	// 		}, (error) => {
	// 			reject(error)
	// 		})
	// 	})
	// }
	// get_userlist(e) {
	// 	this.userlist(e).then((val) => {
	// 		var user_array = val.data.data;
	// 		user_array = this.props.user_array.map((user) => {
	// 			return (
	// 				<UserItemList user={user} key={user._id} hidden={this.props.hidden} deleteUser={this.deleteUser}></UserItemList>
	// 			);
	// 		});
	// 	});
	// }
	render() {
		return (
			<div>
				<button className="btn pull-right btn-xs btn-danger img-circle" onClick={() => {
					this.logout
				}}>Remove</button>
			</div>
		)
	}
}
