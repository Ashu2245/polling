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
                </div>
                <div className="pull-right">
                    <button onClick={this.logOut}>log out</button>
                </div>
                <div className="content"></div>
                {this.props.children}
            </div>
        )
    }
}
