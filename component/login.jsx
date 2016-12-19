import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, link} from 'react-router';
import axios from "axios";
import styles from './index.scss'

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.login = this.login.bind(this);
        this.login_user = this.login_user.bind(this);
    }
    login(event) {
        event.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        return new Promise(function(resolve, reject) {
            return axios.get("http://144.76.34.244:8000/login?username=" + username + "&password=" + password).then((data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }
    login_user(e) {
        this.login(e).then((val) => {
            var user = val.data.data.role;
            var user_err = val.data.error;
            if (user == "admin") {
                this.props.router.push("globalnew/");
            } else if (user_err == 0) {
                this.props.router.push("userpage/");
            } else {
                alert('PLease Check Your USERNAME and PASSWORD');
                this.setState({username: '', password: ''});
            }
        });
    }
    render() {
        return (

            <div className="col-sm-6 col-md-4 col-md-offset-4">
                <div className="well well-lg">
                    <h1 className="text-center login-title">Login</h1>
                    <div className="account-wall">
                        <form className="form-signin" onSubmit={this.login_user}>
                            <label >Username:</label>
                            <input onChange={(e) => {
                                this.setState({username: e.target.value})
                            }} type="text" value={this.state.username} id="email" className="form-control" placeholder="Enter Username"/>
                            <label >Password:</label>
                            <input onChange={(e) => {
                                this.setState({password: e.target.value})
                            }} type="password" value={this.state.password} id="pwd" className="form-control" placeholder="Enter password"/>
                            <label></label>
                            <input className="btn btn-lg btn-primary btn-block" type="submit" value="LOGIN"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
