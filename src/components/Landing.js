import React, { Component } from 'react'

import {connect} from 'react-redux'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

import { getUserInfo, totalUnreadMemoriesById } from '../ducks/reducer'

import '../styles/components/Main.css'
import Header from './Header'

class Landing extends Component {


	componentWillMount(){
		axios.get(`/api/getUserInfo`).then((response) => {
			response = response.data[0]
			this.props.getUserInfo(response);
			console.log('got user info!', this.props.user.id)
			axios.get(`/api/totalUnreadMemoriesById`).then((response2) => {
				console.log('got memories')
				return this.props.totalUnreadMemoriesById(response2.data.count)
			})
		})
	}

	// authenticate(){
	// 	axios.get('/auth/me').then((response) => {
	// 		console.log(response.data)
	// 	})
	// }
	
	render(){


		return (
			<div className='Landing'>
				<Header />
				<h1>Welcome to MyMemories, {this.props.user.first_name}!</h1>
				{/* <button onClick={this.authenticate}>Authenticate User</button> */}
				<p>You currently have <span className="unread_messages">{this.props.totalUnread}</span> unseen memories.</p>
				{this.props.totalUnread > 0 ? <p>Check them out below!</p> : null}
				<div className="button_container">
					<Link to="/memories" className="link">View My Memories</Link>
					<div className="unseen_memories">{this.props.totalUnread}</div>
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
	getUserInfo,
	totalUnreadMemoriesById
}
export default withRouter(connect(mapStateToProps, updateActions)(Landing));