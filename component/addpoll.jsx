import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Pollitems} from './pollitems.jsx';
import {Addlist} from './addlist.jsx';
import {Router, Route, Link} from 'react-router'
import {Admin} from './admin.jsx';
import axios from "axios";
import styles from './index.scss';
import {CONFIG} from './config.jsx';

export class Addpoll extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "",
			options: [
				"", "", ""
			],
			joinOptn: "",
			input_wrong: "hide"
		}
		this.addCan = this.addCan.bind(this);
		this.addOptn = this.addOptn.bind(this);
		this.Change = this.Change.bind(this);
		this.addPolling = this.addPolling.bind(this);
		this.removeOptn = this.removeOptn.bind(this);

	}
	componentWillMount() {
		if (localStorage.getItem("role") != "admin") {
			this.props.router.push('/')
		} else {
			return;
		}
	}
	addCan() {
		this.props.router.push('admin/pollview/')
	}
	addOptn() {
		const oldState = this.state.options
		oldState.push('');
		this.setState({options: oldState})
	}
	Change(index, e) {
		const currentOptn = this.state.options;
		currentOptn[index] = e.target.value;
		this.setState({options: currentOptn})
		this.matchingOptn();
	}
	removeOptn() {
		const prevState = this.state.options;
		prevState.pop();
		this.setState({options: prevState})
		this.matchingOptn();
	}
	matchingOptn() {
		let pollString = this.state.options;
		let test = pollString.join("____");
		this.setState({joinOptn: test})
	}
	addPoll() {
		let title = this.state.title
		let joinOptn = this.state.joinOptn
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "add_poll?title=" + title + "&options=" + joinOptn).then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}
	addPolling(e) {
		this.addPoll(e).then((val) => {
			var value = val.data.error;
			if (value == 0) {
				this.props.router.push('admin/pollview/')
			} else {
				this.setState({input_wrong: show})
			}
		})
	}
	render() {
		let add_list = this.state.options.map((list, index) => {
			return (
				<Addlist key={index} change={this.Change.bind(this, index)} number={index + 1}></Addlist>
			)
		});

		return (
			<div className={styles.login}>
				<div className=" col-md-3 col-md-offset-5">
					<div className="well well-lg">
						<h1 className="text-center login-title">
							<i className="fa fa-list-alt fa-3x" aria-hidden="true"></i>
						</h1>
						<form className="form-signin" onSubmit={this.addPolling}>
							<input onChange={(e) => {
								this.setState({title: e.target.value})
							}} type="text" value={this.state.title} id="email" required className="form-control" placeholder="Enter Title for Poll"/>
							<label>Add your options</label>
							<div>{add_list}</div>
							<div className={styles.buttonleft}>
								<button className=" btn btn-success " onClick={this.addOptn}>
									<i className="fa fa-plus-square" aria-hidden="true"></i>
								</button>
								<div className="pull-right">
									<button className="btn btn-danger " onClick={this.removeOptn}>
										<i className="fa fa-trash" aria-hidden="true"></i>
									</button>
								</div>
							</div>
							<input className="btn-success btn btn-block " type="submit" value="ADD"/>
						</form>
						<div className={styles.pollbutton}>
							<button className="btn-danger btn btn-block " onClick={this.addCan}>Cancel</button>
						</div>
					</div>
					<div className={this.state.input_wrong}>
						<div className="alert alert-danger">
							<strong>Warning!</strong>
							Please enter correct username and password
						</div>
					</div>
				</div>
			</div>
		);
	}
}
