import React, { Component } from 'react'

import store from '../ducks/store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import '../styles/components/Main.css'
import logo from '../styles/assets/myMemoriesLogo.png'

import axios from 'axios'

class Login extends Component {
    
    loginButtonClicked() {
        axios.get('http://localhost:3001/auth').then((response) => {
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
                        <a href="http://localhost:3001/auth"><button>Login</button></a>
                        <a href="http://localhost:3001/auth"><button id="sign_up_button">Sign Up</button></a>
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