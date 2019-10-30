import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import { App, Landing, LoginForm, RegistrationForm } from './components/Pages'
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'

import './Home.css'

import UserContext from './context/UserContext'

class Home extends Component {
  state = { isLoggedIn: false }

  updateLoginStatus = () => this.setState({isLoggedIn: !this.state.isLoggedIn})

  render() {
    const { isLoggedIn } = this.state
    const contextValue = { 
        isLoggedIn,
        updateLoginStatus: this.updateLoginStatus
    }

    return (
      <UserContext.Provider value={contextValue}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <PublicOnlyRoute path='/login' component={LoginForm}/>
          <PublicOnlyRoute path='/register' component={RegistrationForm}/>
          <PrivateRoute path='/app' component={App}/>
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default Home;