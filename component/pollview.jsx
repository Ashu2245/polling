import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Pollitems} from './pollitems.jsx';
import {Router, Route, Link} from 'react-router'
import {Admin} from './admin.jsx';
var _ = require('lodash');
import axios from "axios";
import styles from './index.scss';
import {CONFIG} from './config.jsx';
export class Pollview extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			array: [],
			optn: "",
			editTitle: "hide"
		}
		this.back = this.back.bind(this);
		this.addPoll = this.addPoll.bind(this);
		this.getPollView = this.getPollView.bind(this);

	}
	componentDidUpdate(props) {
		this.getPollView();
	}
	componentWillMount() {
		if (localStorage.getItem("role") != "admin") {
			this.props.router.push('/')
		} else {
			this.getPollView();
			return;
		}
	}
	back() {
		this.props.router.push('admin/')
	}
	addPoll() {
		this.props.router.push('admin/pollview/addpoll/')
	}
	userlist() {
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "list_polls").then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}
	getPollView() {
		this.userlist().then((val) => {
			let user_array = val.data.data;
			this.setState({array: user_array});
		});
	}
	render() {
		let users = this.state.array;
		let user_info = _.map(users, (user, index) => {
			return (
				<div className="well" key={index}>
					<div >Question:{user.title}
						<div >
							<button className={styles.editTitle} onClick={(e) => this.setState({editTitle: "show"})}>Edit title</button>
						</div>
						<div className={this.state.editTitle}>
							<input type="text" name="option" onChange={(e) => {
								this.setState({optn: e.target.value})
							}} value={this.state.optn}></input>
						</div>
					</div>
					<div>
						<Pollitems user={user} index={index}></Pollitems>
					</div>
				</div>
			);
		});
		return (
			<div className="container">
				<div>
					<div>
						<button className="btn btn-danger pull-left" onClick={this.addPoll}>Add New Poll</button>
					</div>
					<button className="btn btn-danger pull-right" onClick={this.back}>back</button>
					<div className={styles.div_color}>
						<h1 className={styles.text}>WELCOME TO POLL VIEW PAGE
						</h1>
					</div>
					<div >
						{user_info}
					</div>
				</div>
			</div>
		);
	}
}
