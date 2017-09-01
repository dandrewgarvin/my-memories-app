import React, { Component } from 'react'

import store from '../ducks/store'
import {connect} from 'react-redux'

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

export default connect(mapStateToProps, updateActions)(App);