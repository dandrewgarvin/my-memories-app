import React, { Component } from 'react'

// import store from '../ducks/store'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


import '../styles/components/Main.css'
import Header from './Header'

class Memories extends Component {

    constructor(){
        super();

        this.state = {
            userId: 1,
            memories: {}
        }
    }

    openMemoryById(){
        console.log('working')
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/api/getMemoriesByUser/${this.state.userId}`).then((response) => {
            console.log(response.data)
            this.setState({
                memories: response.data
            })
        })
    }

	render(){

        function memoryList(){
            this.state.memories.forEach((e,i,a) => {
                return (
                    <div className="unread_memory_envelop" onClick={this.openMemoryById}>
                        <div className="new_memory_icon">New!</div>
                        <div className="new_memory_triangle"></div>
                        {/* <div className="open_new_memory"></div> */}
                        <h1 className="memory_title">{e.memory_title}</h1>
                        <h1 className="memory_sender_from">From:</h1>
                        <h2 className="memory_sender">{e.sending_user_first} {e.sending_user_last}</h2>
                    </div>
                )
            })
        }

		return (
			<div className='Memories'>
				<Header />
                {/* {displayMemories} */}
				 {this.state.memories ? memoryList : <p>no data</p>} 
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

let updateActions = {
	
}

export default withRouter(connect(mapStateToProps, updateActions)(Memories));