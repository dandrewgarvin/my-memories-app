import React, { Component } from 'react'

import {connect} from 'react-redux'

import '../styles/components/Main.css'
import logo from '../styles/assets/myMemoriesLogo.png'

import axios from 'axios'

class Login extends Component {
    
    loginButtonClicked() {
        axios.get('/auth').then((response) => {
            
        })
    }

	render(){
		return (
			<div className='Login'>
                <header>
                    <img src={logo} alt="Main MyMemories Logo" className="main_logo"/>
                </header>
                <main>
                    <p>Oops! It looks like you're not logged in.</p>
                    <p>To continue using MyMemories, please log in now!</p>
                    <section className="buttons">
                        <a href="http://192.168.0.43:3001/auth"><button>Login or Sign Up</button></a>
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

export default connect(mapStateToProps, updateActions)(Login);