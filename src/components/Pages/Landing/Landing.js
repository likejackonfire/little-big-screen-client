import React, { Component } from 'react'

import RegistrationForm from '../Register/RegistrationForm'

import landingImage from ''
import signUpImage from ''

class Landing extends Component {
    createLanding = () => {
        return (
            <main>
                <header className="parallax cover vh pv5" style={{backgroundImage: `url(${landingImage})`}}>
                    <h1 className="white tc f1">Little Big Screen</h1>
                </header>
    
                <section className="vh pv5 bg-light-purple black tc">
                    <header className="pa3 f3">
                        <h3>Keep track of the shows you watch</h3>
                    </header>
                    <p className="pa3">When trying to keep up with new show releases, it becomes difficult to remember what shows you have been watching or have been meaning to watch.</p>
                </section>
    
                <section className="vh pv5 bg-black white tc">
                    <header className="pa3 f3">
                        <h3>Adding shows to your tracker is very simple</h3>
                    </header>
                    
                    <p className="pa3">Add shows to your tracker with ease by filling out the channel and title.</p>
                </section>
                
                <section className="vh pv5 bg-moon-gray black tc">
                    <header className="pa3 f3">
                        <h3>Keep track of what show or shows you are currently watching</h3>
                    </header>
                    
                    <p className="pa3">By listing what shows you are currently watching you can put all of your focus on remembering other things!</p>
                </section>
    
                <section id="signUp" className="parallax cover vh pv5 white tc" style={{backgroundImage: `url(${signUpImage})`}}>
                    <header className="pa3 f3">
                        <h3>Start Adding Shows Now!</h3>
                    </header>
                    <RegistrationForm />
                </section>
            </main>
        )
    }
    render(){
        return this.createLanding()
    }
}

export default Landing;