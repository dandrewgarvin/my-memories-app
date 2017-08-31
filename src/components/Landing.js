import React, { Component } from 'react'

import store from '../ducks/store'
import {connect} from 'react-redux'

import '../styles/components/Main/Main.css'

class Landing extends Component {

	render(){
		return (
			<div className='Landing'>
				<p>This is the Landing Page</p>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
	
}

export default connect(mapStateToProps, updateActions)(Landing);