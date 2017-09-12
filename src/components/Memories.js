import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

import { getMemories, viewedMemory } from '../ducks/reducer'


import '../styles/components/Main.css'
import Header from './Header'

class Memories extends Component {

    componentWillMount(){
        if (!this.props.user.id) {
			return this.props.history.push('/')
		}
        axios.get(`/api/getMemoriesByUser`).then((response) => {
            return this.props.getMemories(response.data);
        })
    }

    openMemoryById(data){
        axios.put(`api/userHasViewedMemory/${data.memory_id}`).then((response) => {
            this.props.viewedMemory(data);
            return this.props.getMemories(response.data.memory_id);
        })
    }
    
	render(){

        let memoryList = ()=> {
            let mappedMemories
            if (this.props.memories){
                if (this.props.memories.length > 0) {
                    mappedMemories = this.props.memories.map((e,i,a) => {
                        return (
                            <Link className="view_memory" to="/view-memory" key={e.memory_id}><div className="unread_memory_envelop" key={e.memory_id} onClick={this.openMemoryById.bind(this, e)}>
                                <div className="new_memory_icon">New!</div>
                                <div className="new_memory_triangle"></div>
                                {/* <div className="open_new_memory"></div> */}
                                <h1 className="memory_title">{e.memory_title}</h1>
                                <h1 className="memory_sender_from">From:</h1>
                                <h2 className="memory_sender">{e.sending_user_first} {e.sending_user_last}</h2>
                            </div></Link >
                        )
                    })
                } else mappedMemories = <h1 className="all_memories_seen">You have seen all of your memories!</h1>
            }
            else mappedMemories = <h1 className="all_memories_seen">Loading...</h1>
            return mappedMemories
        }


		return (
			<div className='Memories'>
				<Header />
                {memoryList()}
                {/* {this.props.memories.length > 0 ? mappedMemories : <h1>No memories found. Try refreshing the page.</h1>} */}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
    getMemories,
    viewedMemory
}

export default withRouter(connect(mapStateToProps, updateActions)(Memories));