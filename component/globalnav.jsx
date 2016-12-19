import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Dashboard} from './dashboard.jsx';
import {Router, Route, Link} from 'react-router'

export class GlobalNav extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.router.push("/")
    }
    render() {
        return (
            <div >
                <div >
                    <h1>hello</h1>
                </div>
                <div className="content">
                    {this.props.children || < Dashboard />}
                </div>
                <input type="submit" onClick={this.logout} value="LOGOUT"/>
            </div>
        )
    }
}
