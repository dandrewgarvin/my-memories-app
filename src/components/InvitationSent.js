import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class InvitationSent extends Component {

    componentWillMount(){
		if (!this.props.user.id) {
			return this.props.history.push('/')
		}
    }

	render(){

		return (
			<div className='InvitationSent'>
				<Header />
                <main>
                    <h1>Your invitation has been sent!</h1>
                    <h1>Thank you for sharing your memories</h1>
                    <div className="button_container">
                        <Link to="/connect" className="connect_button">Connect to Someone Else</Link>
                        <Link to="/upload" className="send_memory_button">Send a Memory</Link>
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

export default withRouter(connect(mapStateToProps, updateActions)(InvitationSent));