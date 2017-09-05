import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class ViewMemory extends Component {

	render(){
        const timestamps = (toFormat) => {
            if (toFormat) {
                var date = new Date(toFormat);
                let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return (month[date.getMonth() + 1]) + ' ' + (date.getDate() + 1) + ' ' +  date.getFullYear();
            } else {return null}
        }

        let meme = this.props.viewedMemory;

		return (
			<div className='ViewMemory'>
				<Header />
                <main>
                    <div className="image_container">
                        <h1 className="memory_title">{meme.memory_title}</h1>
                        <img src={meme.img_url} className="view_memory_image" alt="user submitted memory" />
                    </div>
                    <p>{meme.memory_text}</p>
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