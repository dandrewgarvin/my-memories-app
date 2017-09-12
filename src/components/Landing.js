import React, { Component } from 'react'

import {connect} from 'react-redux'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

import { getUserInfo, totalUnreadMemoriesById } from '../ducks/reducer'

import '../styles/components/Main.css'
import Header from './Header'

class Landing extends Component {

	constructor(){
		super()

		this.state = {
			requests: []
		}
	}

	componentWillMount(){
		axios.get(`/api/getUserInfo`).then((response) => {
			response = response.data[0]
			if ( !response || response.status === 400) {
				return this.props.history.push('/')
			}
			this.props.getUserInfo(response);
			axios.get(`/api/totalUnreadMemoriesById`).then((response2) => {
				return this.props.totalUnreadMemoriesById(response2.data.count)
			})
		})
	}

	componentDidMount(){
		setTimeout(() => {
			axios.get('/api/getRequests').then((response) => {
				if (response.data.length > 0){
					this.setState({requests: response.data})
				}
			})
		}, 500)
	}

	handleRequestAccepted(e){
		axios.put('/api/updateRequest', {relationshipStatus: 1, relationshipId: e.relationship_id}).then((response) => {
			this.setState({
				requests: response.data
			})
		})
	}

	handleRequestRejected(e){
		axios.put('/api/updateRequest', {relationshipStatus: 2, relationshipId: e.relationship_id}).then((response) => {
			this.setState({
				requests: response.data
			})
		})
	}
	
	render(){

		let showRequestList = () => {
			let userInfo = this.state.requests.map((e,i,a) => {
				return (
					<div className="friend_request_mapped" key={e.relationship_id}>
						<h2 className="friend_request_info">{e.first_name} {e.last_name} [<span className="id_color_change">{e.action_user_id}</span>]</h2>
						<button className="accept" onClick={this.handleRequestAccepted.bind(this, e)}>Accept</button>
						<button className="reject" onClick={this.handleRequestRejected.bind(this, e)}>Reject</button>
					</div>
				)
			})

			return (
				<div className="friend_request">
					<h1>You have a relationship request!</h1>
					{userInfo}
				</div>
			)
		}

		return (
			<div className='Landing'>
				<Header />
				{this.state.requests.length > 0 ? showRequestList() : null}
				<h1>Welcome to MyMemories, {this.props.user.first_name}!</h1>
				{/* <button onClick={this.authenticate}>Authenticate User</button> */}
				<p>You currently have <span className="unread_messages">{this.props.totalUnread}</span> unseen memories.</p>
				{this.props.totalUnread > 0 ? <p>Check them out below!</p> : null}
				<div className="button_container">
					<Link to="/memories" className="link">View My Memories</Link>
					<div className="unseen_memories">{this.props.totalUnread}</div>
					<Link to="/upload" className="button_send link">Send a Memory</Link>
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