import React, { Component } from 'react'

import store from '../ducks/store'
import {connect} from 'react-redux'

import '../styles/components/Main/Main.css'
import logo from '../styles/assets/myMemoriesLogo.png'

import axios from 'axios'

class Login extends Component {
    
    loginButtonClicked() {
        axios.get('http://localhost:3001/api/home').then((response) => {
            console.log(response.data)
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
                        <button onClick={this.loginButtonClicked}>Login</button>
                        <button>Sign Up</button>
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