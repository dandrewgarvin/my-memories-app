import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class ViewMemory extends Component {

    componentWillMount(){
		if (!this.props.user.id) {
			return this.props.history.push('/memories')
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

	render(){
        const timestamps = (toFormat) => {
            if (toFormat) {
                var date = new Date(toFormat);
                let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return month[date.getMonth()] + ' ' + date.getDate() + ' ' +  date.getFullYear();
            } else return
        }

        let meme = this.props.viewedMemory;

		return (
			<div className='ViewMemory'>
				<Header />
                <main>
                    <div className="image_container">
                        <h1 className="memory_title item_to_hide">{meme.memory_title}</h1>
                        <h1 className="memory_date item_to_hide">Date: {timestamps(meme.memory_date)}</h1>
                        <img src={meme.img_url} className="view_memory_image" alt="user submitted memory" />
                    </div>
                    <p className="memory_text">{meme.memory_text}</p>
                    <p>Sent to you by: <span className="color_text">{meme.sending_user_first} {meme.sending_user_last}</span></p>
                    <p>Submitted on: <span className="color_text">{timestamps(meme.submission_date)}</span></p>
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

export default withRouter(connect(mapStateToProps, updateActions)(ViewMemory));