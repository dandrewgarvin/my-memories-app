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
            recipient: '',
            memoryDate: {
                day: null,
                month: null,
                year: null
            },
            title: ''
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
        this.setState({
            recipient: e.target.value
        })
    }

    handleDateChange(e){
        // console.log(e.target.name)
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
                console.log('not valid entry')
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
        console.log(this.state.recipient, this.state.memoryDate, this.state.title)
    }

	render(){

        let selectionList = this.state.relationships.map((e,i,a) => {
            return (
                <option key={i}>{e.first_name} {e.last_name}</option>
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