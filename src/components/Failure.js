import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class Failure extends Component {

	constructor(){
		super()

		this.handleHomeClick = this.handleHomeClick.bind(this)
	}

	componentWillMount(){
		if (!this.props.user.id) {
			return this.props.history.push('/')
		}
    }

	handleHomeClick(){
		this.props.history.push('/home')
	}


	render(){

		return (
			<div className='Failure'>
				<Header />
                <main>
                    <h1 className="failure_text">Your memory could not be sent at this time.</h1>
					<h1 className="failure_text">Please try again later.</h1>
					<h1 className="failure_text">Internal Error Code (<span className="error_code">45683236</span>)</h1>
					<div className="button_container">
						<button className="home_button" onClick={this.handleHomeClick}>Back Home</button>
					</div>
                </main>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {

}

export default withRouter(connect(mapStateToProps, updateActions)(Failure));