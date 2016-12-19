import React from 'react'
import {Link} from 'react-router'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router'
export class Userpage extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.router.push("/")
    }
    render() {
        return (
            <div>
                <h2>HERE YOU WILL SEE THE USER POLL
                </h2>
                <p>Demo showing how user will select the polls</p>
                <ul>
                    <li>xyz</li>
                    <li>abx</li>
                    <li>dksi</li>
                    <li>laj</li>
                </ul>
                <button className="btn">Submit Vote</button>
                <input type="submit" onClick={this.logout} value="LOGOUT"/>
            </div>
        )
    }
}
