import React from 'react'
import {Link} from 'react-router'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router'
import axios from "axios"
import {CONFIG} from './config.jsx'
import styles from './index.scss'

export class Userpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			optn: '',
			options: "show",
			after_vote: "hide",
			polls: []
		};
		this.votingPoll = this.votingPoll.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
		this.props.router.push("/")
	}

	vote(e) {
		e.preventDefault();
		let optText = this.state.opt
		let id = this.state.id;
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "do_vote?id=" + id + "&option_text=" + optText).then((data) => {
				resolve(data)
				console.log(data.data.error);
			}, (error) => {
				reject(error)
			})
		})
	}
	votingPoll(e) {
		this.vote(e).then((val) => {
			var user = val.data.error;
			if (user == 0) {
				this.setState({after_vote: "show", options: "hide"})
			}
		});
	}
	componentWillMount() {
		this.getListPolls();
		return;
	}

	getList() {
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "list_polls").then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}

	getListPolls() {
		this.getList().then((val) => {
			let poll_array = val.data.data;
			this.setState({polls: poll_array});
		});
	}

	render() {
		let userpoll = this.state.polls.map((poll, index) => {
			let optnpoll = poll.options.map((polloptn, index) => {
				return (
					<div key={index}>
						<ul>
							<li type="none">
								<input type="radio" className="radio-inline" name="opt" onClick={() => {
									this.setState({id: poll._id, opt: polloptn.option});
								}}/> {polloptn.option}
							</li>
						</ul>
					</div>
				)
			});
			return (

				<div className="col-sm-9 col-sm-7 col-md-offset-3" key={index}>
					<div className={this.state.options}>
						<div className="well">
							<div className={styles.h2}>
								QUESTION:
								<span className={styles.span3}>{poll.title}</span>
								{optnpoll}
							</div>
							<input type="button" className="btn btn-success" onClick={(evt) => {
								this.votingPoll(evt);
							}} value="VOTE"></input>
						</div>
					</div>
					<div className={this.state.after_vote}>
						<h1>Thanks for voting
						</h1>
					</div>
				</div>

			)
		});

		return (
			<div>
				<div className="pull-right">
					<input className="btn btn-danger" type="submit" onClick={this.logOut} value="logOut"/>
				</div>
				<h2>Welcome Guest</h2>
				{userpoll}
			</div>
		)
	}

}
