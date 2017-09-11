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

		return (
			<div className='NewConnection'>
				<Header />
                <main>
                    {this.state.userSelected ? foundUser() : findUser()}
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