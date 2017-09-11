import React, { Component } from 'react'

import '../styles/components/Main.css'
import logo from '../styles/assets/myMemoriesLogo.png'
import {Link} from 'react-router-dom'


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
                <Link className="menu_link_item" to="/home" >Go Home</Link >
                <Link className="menu_link_item" to="/memories" >View My Memories</Link >
                <Link className="menu_link_item" to="/upload">Submit a Memory</Link >
                <Link className="menu_link_item" to="/connect">Connect with a Loved One</Link >
                 <a className="menu_link_item" href="http://192.168.0.43:3001/auth/logout">Logout</a >
        </div>;
        let hamburgerOpen = <span onClick={this.buttonClicked} className="menu_open"></span>;
        let hamburgerClose = <span onClick={this.buttonClicked} className="menu_open active"></span>;
        
		return (
			<div className='Header'>
                <img src={logo} alt="MyMemories Logo" />
                {this.state.menuOpen ? hamburgerClose : hamburgerOpen}
                {this.state.menuOpen ? menuDivShadow : null}
                {this.state.menuOpen ? menuDiv : null}
			</div>
		)
	}
}