import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {UserItemList} from './useritemlist.jsx';
import {Router, Route, Link} from 'react-router'
var _ = require('lodash');
import styles from './index.scss';
import {Admin} from './admin.jsx';
import axios from "axios";
import {CONFIG} from './config.jsx';
export class UserList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			array: []
		}
		this.back = this.back.bind(this);
	}
	componentWillMount() {
		if (localStorage.getItem("role") != "admin") {
			this.props.router.push('/')
		} else {
			this.get_userlist();
			return;
		}
	}
	back() {
		this.props.router.push('admin/')
	}
	userlist() {
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "list_users").then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}
	get_userlist() {
		this.userlist().then((val) => {
			let user_array = val.data.data;
			this.setState({array: user_array});
		});
	}
	render() {
		let users = this.state.array;
		let user_info = _.map(users, (user, index) => {
			return (
				<UserItemList user={user} key={index} item={index}></UserItemList>
			);
		});
		return (
			<div>
				<button className="btn btn-danger pull-right" onClick={this.back}>back</button>
				<div className="container">
					<table className="table table-bordered ">
						<thead className={styles.head}>
							<tr >
								<th >S no.</th>
								<th >Username</th>
								<th >Password</th>
								<th >Role</th>
							</tr>
						</thead>
						<tbody>
							{user_info}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
