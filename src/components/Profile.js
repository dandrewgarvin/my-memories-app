import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class Profile extends Component {

    // componentWillMount(){
	// 	if (!this.props.user.id) {
	// 		return this.props.history.push('/')
	// 	}
    // }

    constructor(){
        super()

        this.state = {
            selectedOption: 'none'
        }
        this.handleSaveChanges = this.handleSaveChanges.bind(this)
    }

    handleRadioSelect(e){
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleSaveChanges(){
        console.log('Submitted. Value set at:', this.state.selectedOption)
    }

	render(){

		return (
			<div className='Profile'>
				<Header />
                <main>
                    <section className="data_container">
                        <h1 className="data_header">Name:</h1>
                        <h2 className="data_body">{this.props.user.first_name} {this.props.user.last_name} Andrew Garvin</h2>
                        <button className="data_show">Edit</button>
                    </section>
                    <section className="data_container">
                        <h1 className="data_header">Email:</h1>
                        <h2 className="data_body">{this.props.user.email}dandrewgarvin@gmail.com</h2>
                        <button className="data_show">Show Email</button>
                    </section>
                    <section className="data_container">
                        <h1 className="data_header">Phone:</h1>
                        <h2 className="data_body">{this.props.user.phone ? this.props.user.phone : 'No number in file'}</h2>
                        <button className="data_show">Show Number</button>
                    </section>
                    <section className="preference_container">
                        <h1 className="preference_header">Notification Preferences</h1>
                        <form onSubmit={this.handleSaveChanges} className="preference_body">
                            <label className="preference_input"><input type="Radio" checked={this.state.selectedOption === 'none'} value="none" onChange={this.handleRadioSelect.bind(this)}/>None</label>
                            <label className="preference_input right"><input type="Radio" checked={this.state.selectedOption === 'email'} value="email" onChange={this.handleRadioSelect.bind(this)}/>Email</label>
                            <label className="preference_input"><input type="Radio" checked={this.state.selectedOption === 'text'} value="text" onChange={this.handleRadioSelect.bind(this)}/>Text</label>
                            <label className="preference_input right"><input type="Radio" checked={this.state.selectedOption === 'both'} value="both" onChange={this.handleRadioSelect.bind(this)}/>Both</label>
                            <button className="preference_submit" type="submit">Save Changes</button>
                        </form>
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

export default withRouter(connect(mapStateToProps, updateActions)(Profile));