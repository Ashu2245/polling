import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {UserItemList} from './useritemlist.jsx';
import {Router, Route, Link} from 'react-router'
import axios from "axios";
import {CONFIG} from './config.jsx';

export class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: []
        }
    }
    componentWillMount() {
        if (localStorage.getItem("role") != "admin") {
            this.props.router.push('/')
        } else {
            this.get_userlist();
            return;
        }
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
        let user_info = this.state.array.map((user, index) => {
            return (
                <UserItemList user={user} key={index}></UserItemList>
            );
        });
        return (
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user_info}
                    </tbody>
                </table>
            </div>
        );
    }
}
