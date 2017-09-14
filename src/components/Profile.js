import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import '../styles/components/Main.css'
import Header from './Header'

class Profile extends Component {


    constructor(){
        super()

        this.state = {
            selectedOption: 'none',
            userData: null,
            email: '',
            emailMasked: '',
            phone: '',
            phoneMasked: '',
            isEmailMasked: true,
            isPhoneMasked: true,
            userIsEditingName: false
        }
        this.handleSaveChanges = this.handleSaveChanges.bind(this)
    }

    componentWillMount(){
		if (!this.props.user.id) {
			return this.props.history.push('/home')
        }

        let emailMasked = this.props.user.email
        emailMasked = emailMasked.split('@')
        let emailShown = emailMasked[0].substring(0, 4)
        let emailMask = emailMasked[0].substring(4, emailMasked[0].length).replace(/./g, '*')
        emailMasked[0] = emailShown + emailMask
        emailMasked = emailMasked.join('@')

        let phoneMasked = this.props.user.phone
        let phoneMaskedFirst = phoneMasked.substring(0, 6).replace(/./g, '*')
        let phoneMaskedLast = phoneMasked.substring(6, phoneMasked.length)
        phoneMasked = phoneMaskedFirst + phoneMaskedLast

        let notify = this.props.user.notification_preference
        switch (notify){
            case 0:
                this.setState({selectedOption: 'none'})
            break;
            case 1:
                this.setState({selectedOption: 'email'})
            break;
            case 2:
                this.setState({selectedOption: 'text'})
            break;
            case 3:
                this.setState({selectedOption: 'both'})
            break;
            default:
                return null
        }

        this.setState({
            userData: this.props.user,
            email: this.props.user.email,
            phone: this.props.user.phone || null,
            emailMasked,
            phoneMasked
        })
    }

    handleRadioSelect(e){
        this.setState({
            selectedOption: e.target.value
        })
    }


    handleEditClick(e){
        switch (e.target.value){
            case 'show email':
                this.setState({
                    isEmailMasked: false
                })
            break;
            case 'hide email':
                this.setState({
                    isEmailMasked: true
                })
            break;
            case 'show phone':
                this.setState({
                    isPhoneMasked: false
                })
            break;
            case 'hide phone':
                this.setState({
                    isPhoneMasked: true
                })
            break;
            case 'edit':
                this.setState({
                    userIsEditingName: true
                })
            break;
            default:
                return null
        }
    }

    handleEditFirst(e){
        let userData = this.state.userData
        userData.first_name = e.target.value
        this.setState({
            userData
        })
    }

    handleEditLast(e){
        let userData = this.state.userData
        userData.last_name = e.target.value
        this.setState({
            userData
        })
    }

    handleEditPhone(e){
        let phone = this.state.phone
        phone = e.target.value
        this.setState({
            phone
        })
    }

    handleSaveChanges(){
        if (!(this.state.phone > 0)){
            alert('Not a valid phone number. Please make sure it\'s valid.')
            return null
        }
        let {userData} = this.state
        let notify = this.state.selectedOption
        switch (notify) {
            case 'none':
                notify = 0
            break;
            case 'email':
                notify = 1
            break;
            case 'text':
                notify = 2
            break;
            case 'both':
                notify = 3
            break;
        }
        let submissionData = [
            userData.first_name,
            userData.last_name,
            this.state.email,
            +this.state.phone,
            notify
        ]

        axios.put('/api/updateUserProfile', submissionData).then((response) => {

        })
        
        //call reducer function to update store state for use without having to log-out and back in

    }
    
	render(){

		return (
			<div className='Profile'>
				<Header />
                <main>
                    <section className="data_container">
                        <h1 className="data_header">Name:</h1>
                        { this.state.userIsEditingName ? <div><input className="data_body_input" value={this.state.userData.first_name} onChange={this.handleEditFirst.bind(this)}/> <input className="data_body_input" value={this.state.userData.last_name} onChange={this.handleEditLast.bind(this)}/></div> : <h2 className="data_body">{this.state.userData ? this.state.userData.first_name : 'No Name Shown'} {this.state.userData ? this.state.userData.last_name : null}</h2> }
                        <button className="data_show" value="edit" onClick={this.handleEditClick.bind(this)}>Edit</button>
                    </section>
                    <section className="data_container">
                        <h1 className="data_header">Email:</h1>
                        { this.state.isEmailMasked ? <h2 className="data_body">{this.state.userData ? this.state.emailMasked : 'No Email Shown'}</h2> : <h2 className="data_body">{this.state.userData ? this.state.email : 'No Email Shown'}</h2>}
                        { this.state.isEmailMasked ? <button className="data_show" value="show email" onClick={this.handleEditClick.bind(this)}>Show Email</button> : <button className="data_show" value="hide email" onClick={this.handleEditClick.bind(this)}>Hide Email</button> }
                    </section>
                    <section className="data_container">
                        <h1 className="data_header">Phone:</h1>
                        { this.state.isPhoneMasked ? <h2 className="data_body">{this.state.userData ? this.state.phoneMasked : 'No number Shown'}</h2> : <input className="data_body_input" value={this.state.phone} onChange={this.handleEditPhone.bind(this)} maxLength="10"/> }
                        <button className="data_show" value="show phone" onClick={this.handleEditClick.bind(this)}>Edit Number</button>
                    </section>
                    <section className="preference_container">
                        <h1 className="preference_header">Notification Preferences</h1>
                         <div className="preference_body"> 
                            <label className="preference_input"><input type="Radio" checked={this.state.selectedOption === 'none'} value="none" onChange={this.handleRadioSelect.bind(this)}/>None</label>
                            <label className="preference_input right"><input type="Radio" checked={this.state.selectedOption === 'email'} value="email" onChange={this.handleRadioSelect.bind(this)}/>Email</label>
                            <label className="preference_input"><input type="Radio" checked={this.state.selectedOption === 'text'} value="text" onChange={this.handleRadioSelect.bind(this)}/>Text</label>
                            <label className="preference_input right"><input type="Radio" checked={this.state.selectedOption === 'both'} value="both" onChange={this.handleRadioSelect.bind(this)}/>Both</label>
                            <button className="preference_submit" onClick={this.handleSaveChanges}>Save Changes</button>
                         </div> 
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