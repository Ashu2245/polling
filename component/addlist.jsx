import React from 'react';
import {withRouter} from 'react-router'

export class Addlist extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <div>
			<input type="text" className="form-control" placeholder="Enter Your Option " required onChange={this.props.change}/>
		</div>
	}
}
