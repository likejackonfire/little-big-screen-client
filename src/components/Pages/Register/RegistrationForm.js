import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { InputGroup } from '../../Utils/Utils'
import AuthApiService from '../../../services/auth-api-service'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { 
    fullName: '',
    userName: '',
    password: '',
    passwordMatch: '',
    error: null,
    redirect: false,
    passwordValid: false,
    validationMessages: {
      password: ""
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { fullName, userName, password, passwordMatch } = this.state

    if(password === passwordMatch) {
      this.setState({ error: null })
       AuthApiService.postUser({
         user_name: userName,
         password: password,
         full_name: fullName,
       }).then(user => {
        this.setState({
          fullName: '',
          userName: '',
          password: '',
          passwordMatch: '',
          redirect: true
        })
        this.props.onRegistrationSuccess()
      })
     .catch(res => {
       this.setState({ error: res.error })
     })
    } else {
      this.setState({ error: "Passwords do not match" })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updatePassword = e => {
    const password = e.target.value
    this.setState({ password }, () => {
      this.validatePassword(password) 
    })
  }

  validatePassword(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages }
    let hasError = false

    if (fieldValue.length === 0) {
      fieldErrors.password = "Password is required"
      hasError = true
    } else {
      if (fieldValue.length < 2) {
        fieldErrors.password = "Password must be at least 2 characters long"
        hasError = true
      } else {
        fieldErrors.password = ""
        hasError = false
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        passwordValid: !hasError
      }
    )
  }

  createInputs = inputs => {
    return inputs.map(input => {
      return (
        <InputGroup 
          key={input.inputID}
          labelFor={input.labelFor}
          labelText={input.labelText}
          inputType={input.inputType}
          inputName={input.inputName}
          inputID={input.inputID}
          inputValue={input.inputValue}
          onChange={input.onChange}
          />
      )
    })
  }

  render() {
    const { error, fullName, userName, password, passwordMatch, redirect } = this.state
    const inputs = [
      {
        labelFor: 'RegistrationForm__full_name',
        labelText: 'Full Name',
        inputType: 'text',
        inputName: 'fullName',
        inputID: 'RegistrationForm__full_name',
        inputValue: fullName,
        onChange: this.onChange
      },
      {
        labelFor: 'RegistrationForm__user_name',
        labelText: 'User Name',
        inputType: 'text',
        inputName: 'userName',
        inputID: 'RegistrationForm__user_name',
        inputValue: userName,
        onChange: this.onChange
      },
      {
        labelFor: 'RegistrationForm__password',
        labelText: 'Password',
        inputType: 'password',
        inputName: 'password',
        inputID: 'RegistrationForm__password',
        inputValue: password,
        onChange: this.updatePassword
      },
      {
        labelFor: 'RegistrationForm__password_match',
        labelText: 'Match Password',
        inputType: 'password',
        inputName: 'passwordMatch',
        inputID: 'RegistrationForm__password_match',
        inputValue: passwordMatch,
        onChange: this.onChange
      },
    ]

    if (redirect) {
      return <Redirect to='/app'/>;
    }

    return (
      <form className="br1 measure-narrow mv4 pa3 shadow-3 center bg-white black" onSubmit={this.handleSubmit}>
        <fieldset className="bn">
          <legend className="f3 tc">Sign Up</legend>
          <div role="alert">
            {error && <p className="red">{error}</p>}
          </div>

          {this.createInputs(inputs)}

          <button className="black bg-white hover ph3 pv2 db center" type="submit">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}