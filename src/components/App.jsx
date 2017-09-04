import React, { Component } from 'react'

// import store from '../ducks/store'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../styles/components/Main.css'

import router from '../router'

class App extends Component {

	render(){
		return (
			<div className='App'>
				{router}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
	
}

export default withRouter(connect(mapStateToProps, updateActions)(App));