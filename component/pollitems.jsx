import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {CONFIG} from './config.jsx';
var _ = require('lodash');
import styles from './index.scss';
import {render} from 'react-dom';
export class Pollitems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			add: "hide",
			optn: "",
			optLen: "",
			addpoll: "show",
			lastOpt: "hide"
		}
		this.optRem = this.optRem.bind(this)
		this.pollsAdd = this.pollsAdd.bind(this);
	}
	componentWillReceiveProps(props) {
		this.setState({optLen: this.props.user.options.length})
	}
	removeOptn(id, option) {
		return new Promise(function(resolve, reject) {
			return axios.get(CONFIG.url + "delete_poll_option?id=" + id + "&option_text=" + option).then((data) => {
				resolve(data)
			}, (error) => {
				reject(error)
			})
		})
	}
	optRem(id, option) {
		var len = this.state.optLen
		if (len > 2) {
			this.removeOptn(id, option)
			var leng = len - 1;
			this.setState({optLen: leng})
		} else {
			this.setState({lastOpt: "show"})
		}
	}
	addOptn(id) {
		let optn = this.state.optn
		if (optn.length > 0) {
			return new Promise(function(resolve, reject) {
				return axios.get(CONFIG.url + "add_new_option?id=" + id + "&option_text=" + optn).then((data) => {
					resolve(data)
				}, (error) => {
					reject(error)
				})
			})

		}
	}
	pollsAdd(e) {
		this.addOptn(e).then((val) => {
			var add_option = val.data.error;
			if (add_option == 0) {
				this.setState({optn: ""})
				this.setState({add: "hide", addpoll: "show", lastOpt: "hide"})
			}
		});
	}
	render() {
		let polls = this.props.user.options
		let poll_list = _.map(polls, (user, index) => {
			return (
				<ul key={index}>
					<li>{user.option}
						<span>
							<button className="btn pull-right btn-xs btn-danger img-circle" onClick={() => {
								this.optRem(this.props.user._id, user.option)
							}}>
								<i className="fa fa-trash" aria-hidden="true"></i>
							</button>
						</span>
					</li>
				</ul>
			);
		})
		return (
			<div>
				<div>
					{poll_list}
				</div>
				<div className={this.state.lastOpt}>
					<h5>MINIMUM TWO OPTIONS ARE REQU***</h5>
				</div>
				<div className={styles.pollcan}>
					<div className={this.state.add}>
						<div className="from">
							<input type="text" name="option" className="pull-left" onChange={(e) => {
								this.setState({optn: e.target.value})
							}} value={this.state.optn}></input>
							<div className="pull-left">
								<div className={styles.pollcan}>
									<button className="btn btn-xs btn-success pull-left " onClick={() => {
										this.pollsAdd(this.props.user._id)
									}}>
										<i className="fa fa-plus-square" aria-hidden="true"></i>
									</button>
									<div className={styles.pollcancel}>
										<button className="btn btn-xs  btn-danger  " onClick={(e) => {
											this.setState({add: "hide", addpoll: "show"})
										}}>
											<i className="fa fa-times" aria-hidden="true"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.pollvbutton}>
					<div className={this.state.addpoll}>
						<button className="btn pull-left btn-xs btn-success img-circle" onClick={() => {
							this.setState({add: "show", addpoll: "hide"})
						}}>
							<i className="fa fa-plus-square" aria-hidden="true"></i>
						</button>
					</div>
				</div>
			</div>

		);
	}
}
