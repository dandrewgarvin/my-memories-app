import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class Success extends Component {

	constructor(){
		super()

		this.handleHomeClick = this.handleHomeClick.bind(this)
		this.handleSubmitClick = this.handleSubmitClick.bind(this)
	}

	handleHomeClick(){
		this.props.history.push('/home')
	}

	handleSubmitClick(){
		this.props.history.push('/upload')
	}


	render(){

		return (
			<div className='Success'>
				<Header /> 
                <main>
                    <h1>Your memory has been sent <span className="color_change">successfully!</span></h1>
					<div className="button_container">
						<button className="home_button" onClick={this.handleHomeClick}>Back Home</button>
						<button className="submit_button" onClick={this.handleSubmitClick}>Submit Another Memory</button>
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

export default withRouter(connect(mapStateToProps, updateActions)(Success));