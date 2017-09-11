import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import '../styles/components/Main.css'
import Header from './Header'

class NewConnection extends Component {

    constructor(){
        super()

        this.state = {
            userSearchInput: '',
            userResults: [],
            userSelected: false,
            userFirst: '',
            userLast: '',
            userId: ''
        }
        this.handleUserChangeSelection = this.handleUserChangeSelection.bind(this)
        this.handleConnectClick = this.handleConnectClick.bind(this)
    }

    handleUserInput(e){
        this.setState({
            userSearchInput: e.target.value
        })
        let search = e.target.value
        axios.get(`/api/findUserConnection?input=${search}`).then((response) => {
            this.setState({
                userResults: response.data
            })
        })
    }

    handleUserSelection(e){
        this.setState({
            userSelected: true,
            userFirst: e.first_name,
            userLast: e.last_name,
            userId: e.id
        })
    }

    handleUserChangeSelection(){
        this.setState({
            userResults: [],
            userSelected: false,
            userSearchInput: ''
        })
    }

    handleConnectClick(){
        // connect to server/db to see if relationship already exists. If it does, let the user know they're already connected
            // possible redirect to submit memory page
        // connect to server/db to make a new relationship. the user_one_id is the user on session, and the user_two_id is this.state.userId
        let relationshipInfo = {userId: this.state.userId}
        axios.post('/api/newRelationship', relationshipInfo).then((response) => {
            if (response.data.status === 200) {
                this.props.history.push('/invitation-sent')
            } else {
                console.log(response.data.message)
            }
        })

    }

	render(){

        let displayResults = () => {
            let res = this.state.userResults.map((e,i,a) => {
                return <li onClick={this.handleUserSelection.bind(this, e)} className="display_list_item" key={i}>{e.first_name} {e.last_name} [<span className="color_change_id">{e.id}</span>]</li>
            })
            if (this.state.userSearchInput === '') {
                return null
            }
            return (
                <ul className="display_list">
                    {this.state.userResults ? res : null}
                </ul> 
            )
        }
        
        let findUser = () => {
            return (
                <section>
                    <div className="search_box_container">
                        <label className="search_box_label">Search for a loved one</label> 
                        <input type="text" className="search_box" id="search_box" placeholder="Enter name..." onChange={this.handleUserInput.bind(this)}/>
                    </div>
                    <div className="display_search_results">
                        {this.state.userResults ? displayResults() : null}
                    </div>
                </section>
            )
        }

        let foundUser = () => {
            return (
                <div className="user_selected_container">
                    <label className="user_selected_label">User Selected:</label>
                    <h1 className="user_selected_name">{this.state.userFirst} {this.state.userLast} [<span className="user_selected_highlight">{this.state.userId}</span>]</h1>
                    <button className="change_selection" onClick={this.handleUserChangeSelection}>Change...</button>
                </div>
            )
        }

        let notWorking = ()=> {
            alert('This feature is not currently working')
        }

		return (
			<div className='NewConnection'>
				<Header />
                <main>
                    {this.state.userSelected ? foundUser() : findUser()}
                    <section className="submit_buttons_container">
                        <button className="connect_button" onClick={this.handleConnectClick}>Connect to User</button>
                    </section>
                    <hr className="separator" />
                    <section className="invite_new_container" >
                        <h1 className="invite_new_header">Loved one not found?</h1>
                        <button className="invite_new_button" onClick={notWorking}>Invite New</button>
                    </section>
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

export default withRouter(connect(mapStateToProps, updateActions)(NewConnection));