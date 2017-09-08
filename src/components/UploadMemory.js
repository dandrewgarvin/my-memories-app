import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import '../styles/components/Main.css'
import Header from './Header'

class UploadMemory extends Component {

    constructor(){
        super()

        this.state = {
            relationships: [],
            recipient: null,
            memoryDate: {
                day: null,
                month: null,
                year: null
            },
            title: '',
            falseEntry: null
        }
        this.showState = this.showState.bind(this)
    }

    componentWillMount(){
        axios.get('/api/getRelationships').then((response) => {
            this.setState({
                relationships: response.data
            })
        })
    }

    handleSelectionChange(e){
        let recip = e.target.value;
        recip = recip.split(' ')
        recip[2] = recip[2].replace(/\D/g,'')
        this.setState({
            recipient: {
                first: recip[0],
                last: recip[1],
                id: recip[2]
            }
        })
    }

    handleDateChange(e){
        switch (e.target.name){
            case 'day':
                this.setState({
                    memoryDate:{
                        day: e.target.value,
                        month: this.state.memoryDate.month,
                        year: this.state.memoryDate.year
                    }
                })
                break;
            case 'month':
                this.setState({
                    memoryDate:{
                        day: this.state.memoryDate.day,
                        month: e.target.value,
                        year: this.state.memoryDate.year
                    }
                })
                break;
            case 'year':
                this.setState({
                    memoryDate:{
                        day: this.state.memoryDate.day,
                        month: this.state.memoryDate.month,
                        year: e.target.value
                    }
                })
                break;
            default:
                break;
        }
    }

    handleTitleChange(e){
        this.setState({
            title: e.target.value
        })
    }

    showState(){
        //needs to verify that none of the entries are empty or invalid. If they are, notify user that someone is wrong
        //if all fields are correct, grab current memory information from redux, and compile everything into an object.
        //the object then needs to be submitted to the server, which will create a database entry
        //make sure to include all the fields that are required in a memory (including user id)
        //then clear the redux state
        //redirect to either success or failure page, depending on success or not

        if (this.state.recipient !== 'Select a loved one...') {
            this.setState({
                falseEntry: false
            })
            if (this.state.title) {
                this.setState({
                    falseEntry: false
                })
                if (this.state.memoryDate.day > 0 && this.state.memoryDate.month > 0 && this.state.memoryDate.year > 0){
                    let formattedMemory = []
                    let memeDate = this.state.memoryDate
                    for (var prop in memeDate){
                        formattedMemory.push(memeDate[prop])
                    }
                    formattedMemory = formattedMemory.reverse().join('-')
                    let date = new Date();
                    let dateFormatted = [date.getFullYear(), (date.getMonth() + 1), date.getDate()]
                    dateFormatted = dateFormatted.join('-')
                    // create object of the full memory, then send it to server/db
                    let memoryFull = {
                        sendingUserId: this.props.user.id, // current user id
                        receivingUserId: +this.state.recipient.id, 
                        memoryTitle: this.state.title,
                        memoryText: this.props.createMemoryInfo.memory_text,
                        memoryDate: formattedMemory,
                        imgUrl: this.props.createMemoryInfo.img_url,
                        submissionDate: dateFormatted
                    }

                    axios.post('/api/submitMemory', memoryFull).then((response) => {
                        //redirect the user to the correct page, depending on success or failure
                        this.props.history.push('/success')
                    }).catch((error) => {
                        this.props.history.push('/failure')
                    })
                } else {
                    this.setState({
                        falseEntry: true
                    })
                }
            } else {
                this.setState({
                    falseEntry: true
                })
            }
        } else {
            this.setState({
                falseEntry: true
            })
        }
    }

	render(){

        let selectionList = this.state.relationships.map((e,i,a) => {
            return (
                <option key={i} id={e.user_two_id}>{e.first_name} {e.last_name} [{e.user_two_id}]</option>
            )
        })

		return (
			<div className='UploadMemory'>
				<Header />
                <main>
                    <div className="select_loved_one_container">
                        <select className="select_loved_one" onChange={this.handleSelectionChange.bind(this)}>
                            {/* options should show up only for connections that have been made previously -- requires authentication */}
                            <option>Select a loved one...</option>
                            {selectionList}
                        </select>
                    </div>
                    <div className="memory_date_container">
                        <input className="memory_date_item" name="day" placeholder="dd" maxLength="2" onChange={this.handleDateChange.bind(this)}/>
                        <input className="memory_date_item" name="month" placeholder="mm" maxLength="2" onChange={this.handleDateChange.bind(this)}/>
                        <input className="memory_date_item" name="year" placeholder="yyyy" maxLength="4" onChange={this.handleDateChange.bind(this)}/>
                    </div>
                    <div className="memory_title_container">
                        <input className="memory_title" placeholder="Title your memory..." maxLength="35" onChange={this.handleTitleChange.bind(this)}></input>
                        <div className="false_data_container">
                            {this.state.falseEntry ? <span className="false_data">There is an error in your entry. Please review your data.</span> : null}
                        </div>
                        <button className="submit_memory_button" onClick={this.showState}>Submit Memory</button>
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

export default withRouter(connect(mapStateToProps, updateActions)(UploadMemory));