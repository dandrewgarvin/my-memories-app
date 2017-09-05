import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import { getMemories } from '../ducks/reducer'


import '../styles/components/Main.css'
import Header from './Header'

class Memories extends Component {



    componentWillMount(){
        axios.get(`/api/getMemoriesByUser`).then((response) => {
            return this.props.getMemories(response.data);
        })
    }

    openMemoryById(data){
        axios.put(`api/userHasViewedMemory/${data}/${this.props.user.id}`).then((response) => {
            return this.props.getMemories(response.data);
        })
    }
    
	render(){

        let mappedMemories = this.props.memories.map((e,i,a) => {
            return (
                <div className="unread_memory_envelop" key={e.memory_id} onClick={this.openMemoryById.bind(this, e.memory_id)}>
                    <div className="new_memory_icon">New!</div>
                    <div className="new_memory_triangle"></div>
                    {/* <div className="open_new_memory"></div> */}
                    <h1 className="memory_title">{e.memory_title}</h1>
                    <h1 className="memory_sender_from">From:</h1>
                    <h2 className="memory_sender">{e.sending_user_first} {e.sending_user_last}</h2>
                </div>
            )
        })




		return (
			<div className='Memories'>
				<Header />
                 <div>
				    {mappedMemories}  
                 </div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
	getMemories
}

export default withRouter(connect(mapStateToProps, updateActions)(Memories));