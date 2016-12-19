import React from 'react'
import {Link} from 'react-router'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router'
export class UserItemList extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.user_array.username}</td>
				<td>{this.props.user_array.password}</td>
				<td>{this.props.user_array.role}</td>
			</tr>
		)
	}
} < div className = "row" > <div className="col-md-12">
	<table className="table table-bordered">
		<thead >
			<tr>
				<th>Username</th>
				<th>Password</th>
				<th>Role</th>
			</tr>
		</thead>
		<tbody>
			{user_array}
		</tbody>
	</table>
</div> < /div>
