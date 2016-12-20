import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
export class UserItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillRecevie(props) {
        console.log(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.password}</td>
                <td>{this.props.user.role}</td>
            </tr>
        );
    }
}
