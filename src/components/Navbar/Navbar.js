import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../context/UserContext'

class Navbar extends Component {
    static contextType = UserContext
    
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.updateLoginStatus()
        this.props.history.push('/')
    }
    
    renderLogoutLink = () => {
        return (
          <li className="di pa2" style={{marginLeft: "-30px"}}>
            <Link
              onClick={this.handleLogoutClick}
              to='/'
              className="no-underline white"
              >
              Logout
            </Link>
          </li>
        )
    }
    
    renderLoginLink = () => {
        return (
            <>
                <li className="di ph2" style={{marginLeft: "-30px"}}><Link to='/login' className="no-underline white">Login</Link></li>
                <li className="di ph2"><Link to='/register' className="no-underline white">Signup</Link></li>
            </>
        )
    }

    render() {
        const { isLoggedIn } = this.context
        return (
            <nav className="relative vh ph3 pv2 bg-black" role="navigation">
                <ul className="list flex">
                    {TokenService.hasAuthToken() || isLoggedIn
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </ul>
            </nav>
        )
    }
}

export default withRouter(Navbar)