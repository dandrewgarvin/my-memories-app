import React, { Component } from 'react'

import '../styles/components/Main.css'
import logo from '../styles/assets/myMemoriesLogo.png'


export default class Header extends Component {

    constructor () {
        super();

        this.state = {
            menuOpen: false
        }
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked (){
            if (this.state.menuOpen) {
                this.setState({
                    menuOpen: false
                })
            } else {
                this.setState({
                    menuOpen: true
                })
            }
        }

	render(){
        
        let menuDivShadow = <div className="menu_div_shadow hidden_shadow"></div>;
        let menuDiv = <div className="menu_div">
            <ul>
                <li>Go Home</li>
                <li>View My Memories</li>
                <li>Submit a Memory</li>
                <li>Connect with a Loved One</li>
                <li>Logout</li>
            </ul>
        </div>;
        let hamburgerOpen = <span onClick={this.buttonClicked} className="menu_open"></span>;
        let hamburgerClose = <span onClick={this.buttonClicked} className="menu_open active"></span>;
        
		return (
			<div className='Header'>
                <img src={logo} />
                {this.state.menuOpen ? hamburgerClose : hamburgerOpen}
                {this.state.menuOpen ? menuDivShadow : null}
                {this.state.menuOpen ? menuDiv : null}
			</div>
		)
	}
}