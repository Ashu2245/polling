import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Dashboard} from './dashboard.jsx';
import {Router, Route, Link} from 'react-router'

export class GlobalNav extends React.Component {

	constructor(props) {
		super(props)
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
			</div>
		)
	}
}
