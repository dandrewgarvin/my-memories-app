import React, { Component } from 'react'

import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'


import '../styles/components/Main.css'
import Header from './Header'

import { createMemory } from '../ducks/reducer'

class UploadImage extends Component {

    constructor() {
        super();

        this.state = {
            file: '',
            imagePreviewUrl: '',
            memoryText: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this.uploadFilesToApi = this.uploadFilesToApi.bind(this)
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

    uploadFilesToApi(){
        let imageUrl = this.state.imagePreviewUrl
        let memoryText = this.state.memoryText
        let imageFile = this.state.file.type
        let imageName = this.state.file.name
        //send base64 file to server with this axios call

        axios.post('/api/uploadImage', {imageUrl, imageFile, imageName}).then((response) => {
            let createMemoryInfo = {
                img_url: response.data.Location,
                memory_text: memoryText,
                hasData: true
            }

            this.props.createMemory(createMemoryInfo);
        })
    }

    updateTextValue(e){
        this.setState({
            memoryText: e.target.value
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
                        <textarea className="memory_text" placeholder="The message you would like to send..." value={this.state.memoryText} onChange={this.updateTextValue.bind(this)}/>
                    </div>
                    <div className="button_container">
                        <Link to="/upload-2"><button className="next_page_button" onClick={this.uploadFilesToApi}>Next Page</button></Link>
                    </div>
                </main>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
        createMemoryInfo: state.createMemoryInfo
    }
}

let updateActions = {
    createMemory
}

export default withRouter(connect(mapStateToProps, updateActions)(UploadImage));