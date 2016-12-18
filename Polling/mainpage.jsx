import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Router, Route, Link} from 'react-router'
export class Poll extends React.Component {
	render() {
		return (
			<div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
