import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import styles from './index.scss';
export class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}
	componentWillMount() {
		if (localStorage.getItem("role") != "admin") {
			this.props.router.push('/')
		} else {
			return;
		}
	}
	logOut() {
		localStorage.removeItem('role');
		this.props.router.push('/');
	}
	render() {
		return (
			<div className={styles.wrapper}>
				<div className="pull-left">
					<Link to='admin/userlist/' className={styles.link}>UserList</Link>
					<Link to='admin/adduser/' className={styles.link}>Adduser</Link>
					<Link to='admin/pollview/' className={styles.link}>View Poll</Link>
				</div>
				<div className="pull-right">
					<Link to='admin/profile/' className={styles.link}>ADMIN</Link>
					<div className="pull-right">
						<button className="btn btn-danger btn-block" onClick={this.logOut}>log out</button>
					</div>
				</div>
				<div className="content"></div>
				{this.props.children}
			</div>
		)
	}
}
