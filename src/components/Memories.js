import React, { Component } from 'react'

import store from '../ducks/store'
import {connect} from 'react-redux'
import axios from 'axios'

import '../styles/components/Main.css'
import Header from './Header'

class Memories extends Component {

	render(){

		return (
			<div className='Memories'>
				<Header />
				<h1>Memories Page</h1>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
	
}

export default connect(mapStateToProps, updateActions)(Memories);