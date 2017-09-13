import React, { Component } from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../styles/components/Main.css'
import Header from './Header'

class About extends Component {


	render(){

		return (
			<div className='About'>
				<Header />
                <main>
                    <section className="Introduction">
                        <h1>A Special Note</h1>
                        <p>
                            Dear User,<br/><br/>
                            Welcome to MyMemories!<br/><br/>
                            With the continual development and progression of technology, we feel that there has been a digression of person-to-person relationships that allow us to connect with our fellow human beings on a personal level. <br/><br/>
                            For this reason, we have developed MyMemories, an application that allows you, the user, to send small notes of affection to your loved ones, regardless of location.<br/><br/>
                            Our hope is that society will again see the power in these meaningful relationships, and begin to make the changes nessecary to enable these connections.<br/><br/>
                            Thank you for your support,<br/>
                            Andrew Garvin<br/>
                            Benjamin Pelo<br/><br/>
                        </p>
                    </section>
                    <section className="Founders">
                        <h1>About the Founders</h1>
                        <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAsQAAAAJGU2NzdkMjliLTdkNzgtNGE4Zi1iZjliLWIzNGViOTQxNTg1ZA.jpg"/>
                        <h2 className="AboutAndrew">Andrew Garvin</h2>
                        <p>
                            Andrew spent the first 18 years of his life moving all across the Wasatch Front, though his heart lies in Cache Valley, Utah.<br/><br/>
                            As Andrew has grown up, he has discovered a deep passion for Education, Leadership, and Unlocking Individual Potential.<br/><br/>
                            He believes that in modern society, we no longer cultivate an environment for major growth through allowing individuals to dream big and feel passion.<br/><br/>
                            His greatest desire is to enable and empower those around him to be successful, and he feels that the path he is on will help him have a greater ability to do so.<br/><br/>
                            <span className="bolded">*** Andrew was the lead developer of the MyMemories Web Application ***</span>
                        </p>
                        <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAxsAAAAJGQ0OWMxMzYzLWE5NWItNDcwMi1hOWEyLWVhOTFmMDljZTVhMA.jpg"/>
                        <h2 className="AboutBenjamin">Benjamin Pelo</h2>
                        <p>
                            Ben grew up in the small Utah community of Heber. From a small age, he learned all about business from his dad, who had founded several successful companies including Folio, Ancestry, and iTV.<br/><br/>
                            Growing up, Ben spent most of his time playing basketball, developing video games, and brainstorming ideas for business projects.<br/><br/>
                            In the last few years, Ben has received his Real Estate license, and has co-founded several companies of his own. Currently he is working as the co-founder and lead iOS Developer in the Manhattan, NY office of the social media platform SAY.<br/><br/>
                            <span className="bolded">*** Benjamin was the original brains behind the MyMemories Project ***</span>
                        </p>
                    </section>
                    <section className="Technology_Mobile">
                        <h1>Technology</h1>
                        <h2>For this project, I used the following technologies for the front-end:</h2>
                        <ul>
                            <li>React</li>
                            <li>Redux</li>
                            <li>Router</li>
                            <li>Axios</li>
                            <li>SASS (SCSS)</li>
                        </ul>
                            <h2>To complete the stack, the following were used for the back-end:</h2>
                        <ul>
                            <li>Node</li>
                            <li>Express</li>
                            <li>Passport-Auth0</li>
                            <li>Massive</li>
                            <li>AWS-S3</li>
                            <li>PostgreSQL</li>
                        </ul>
                    </section>
                    <section className="Technology_Desktop">
                        <h1>Technology</h1>
                        <h2>For this project, I used the following technologies for the front-end:</h2>
                        <ul>
                            <li>React<img src="http://ecodile.com/wp-content/uploads/2016/08/react-logo-1000-transparent.png"/></li>
                            <li>Redux<img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png"/></li>
                            <li>Router<img src="https://cdn.worldvectorlogo.com/logos/react-router.svg"/></li>
                            <li>Axios</li>
                            <li>SASS (SCSS)<img src="http://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"/></li>
                        </ul>
                            <h2>To complete the stack, the following were used for the back-end:</h2>
                        <ul>
                            <li>Node<img src="http://ecodile.com/wp-content/uploads/2015/10/node_icon2.png"/></li>
                            <li>Express</li>
                            <li>Passport-Auth0<img src="https://avatars1.githubusercontent.com/u/2824157?v=4&s=400"/></li>
                            <li>Massive</li>
                            <li>AWS-S3<img src="https://cdn.worldvectorlogo.com/logos/aws-logo.svg"/></li>
                            <li>PostgreSQL<img src="https://cdn.worldvectorlogo.com/logos/postgresql.svg"/></li>
                        </ul>
                    </section>
                    <section className="SpecialThanks">
                        <h1>Special Thanks & Sponsors</h1>
                        <h2>Individuals</h2>
                        <p>
                            Andrew Garvin (Development),<br/> Benjamin Pelo (Feedback),<br/> Lloyd Grubham (Mentoring),<br/> Brennon Schow (Formidable Foosball Teammate),<br/> 
                            Alan Miller (Comedic Relief),<br/> Jeremy Robertson (Advanced Foosball Lessons),<br/> Dog Fact Diva (Frequent Dog Facts),<br/> Tate Player (Slack Buddy),<br/> 
                            Seth Haws (Pizza Onsie),<br/> Jordan Allen (Referral to DevMountain),<br/> Outsourced Developers (Assurance That I'll Always Have A Job Fixing Code).
                        </p>
                        <h2>Businesses</h2>
                        <p>
                            Provo Food Truck Rally (Suzy Thai, K88),<br/> Wendys,<br/> DevMountain,<br/> SAY,<br/> Google Fiber,<br/> Spotify,<br/> Costco,<br/> Slack,<br/> Adobe,<br/> Thinking Emojis.
                        </p>
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

export default withRouter(connect(mapStateToProps, updateActions)(About));