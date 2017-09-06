import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import imgur from 'imgur'

import '../styles/components/Main.css'
import Header from './Header'

class UploadImage extends Component {

    constructor() {
        super();

        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this.uploadImageToApi = this.uploadImageToApi.bind(this)
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
        this.setState({
            file: file,
            imagePreviewUrl: reader.result
        });
        }

        reader.readAsDataURL(file)
    }

    removeImage(e){
        this.setState({
            imagePreviewUrl: '',
            file: ''
        })
    }

    uploadImageToApi(){
        let imageUrl = this.state.imagePreviewUrl.split(',')[1]
        // console.log(imageUrl[1])

        // let headers = {
        //     'Authorization': 'Client-ID 2d81fab970aaf19'
        //     // , 'Authorization': 'Bearer 60a848b641ed593c91bb2a1ece1d9aa698076ce6'
        // }
        
        imgur.setClientId('CLIENT-ID ');
        

        imgur.uploadBase64(imageUrl).then((response) => {
            console.log(response.data)
        }).catch((failed) => {
            console.log('failed attempt', failed)
        })
        
    }

	render(){
        
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (
                <div className="image_preview_container">
                    <div className="image_underlay" />
                    <img src={imagePreviewUrl} className="image_preview" alt="user uploaded memory OR file not correct type"/>
                    <h1 className="remove_image_preview" key="img" onClick={this.removeImage.bind(this)}>Remove Image</h1>
                </div>
            );
            console.log($imagePreview)
        }

		return (
			<div className='UploadImage'>
				<Header />
                <main>
                    <div className="upload_image">
                        <input className="upload_image_button" type="file" onChange={this._handleImageChange} />
                        {$imagePreview}
                    </div>
                    <div className="text_container">
                        <textarea className="memory_text" placeholder="The message you would like to send..."/>
                    </div>
                    <div className="button_container">
                        <button className="next_page_button" onClick={this.uploadImageToApi}>Next Page</button>
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

export default withRouter(connect(mapStateToProps, updateActions)(UploadImage));