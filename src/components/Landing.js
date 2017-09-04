import React, { Component } from 'react'

// import store from '../ducks/store'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class Landing extends Component {

	callAxios(){
		axios.get('http://localhost:3001/auth/me').then((response) => {
			console.log(response)
		})
	}
	
	render(){


		return (
			<div className='Landing'>
				<Header />
				<h1>Welcome to MyMemories, {'{'}Andrew{'}'}!</h1>
				<p>You currently have {'{'}<span className="unread_messages">2</span>{'}'} unseen memories.</p>
				<p>Check them out below!</p>
				<div className="button_container">
					<Link to="/memories" className="link">View My Memories</Link>
					<div className="unseen_memories">{'{2}'}</div>
					<Link to="/" className="button_send link">Send a Memory</Link>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
	
}
export default withRouter(connect(mapStateToProps, updateActions)(Landing));