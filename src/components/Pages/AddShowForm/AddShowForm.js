import React, { Component } from "react"

import { ValidationError, Required, InputGroup } from '../../Utils/Utils'

import ShowsContext from '../../../context/ShowsContext'
import ShowApiService from "../../../services/show-api-service";

class AddShowForm extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      title: "",
      networkId: "",
      currentShow: false,
      notes: "",
      updateShowTime: "",
      titleValid: false,
      networkValid: false,
      formValid: false,
      validationMessages: {
        title: ""
      }
    }
  }

  static contextType = ShowsContext

  updateName = e => {
    const title = e.target.value
    this.setState({ title }, () => {
      this.validateTitle(title) 
    })
  }

  updateNetwork = e => {
    let hasError = false
    const { networks } = this.context
    const selectedNetwork = networks.filter(cId => parseInt(cId.network_id) === parseInt(e.target.value));
    const newNetworkId = parseInt(selectedNetwork[0].network_id)
    this.setState(
      {
        networkId: newNetworkId,
        networkValid: !hasError
      },
      this.formValid
    )
  }

  updateContent = e => {
    this.setState({ notes: e.target.value })
  }

  updateCurrentShow = () => {
    this.setState({ currentShow: !this.state.currentShow })
  }

  updateShowTime = e => {
    this.setState({ updateShowTime: e.target.value })
  }

  validateTitle(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages }
    let hasError = false

    fieldValue = fieldValue.trim()
    if (fieldValue.length === 0) {
      fieldErrors.title = "Title is required"
      hasError = true
    } else {
      if (fieldValue.length < 2) {
        fieldErrors.title = "Title must be at least 2 characters long"
        hasError = true
      } else {
        fieldErrors.title = ""
        hasError = false
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        titleValid: !hasError
      },
      this.formValid
    )
  }

  formValid = () => {
    const { titleValid, networkValid } = this.state
    this.setState({
      formValid: titleValid && networkValid
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title, networkId, currentShow, notes, updateShowTime } = this.state
    
    const show = {
      title,
      network_id: networkId,
      current_show: currentShow,
      notes,
      time_to_complete: updateShowTime,
    }

    // FETCH SHOW DATA FROM IMDB

    // POST NEW SHOW
    ShowApiService.postUserShow(show)
    .then(newShow => {
      this.context.addShow(newShow)
      this.props.history.push(`/app/network/${show.network_id}`)
    })
  }

  createInput = () => {
    return (
      <InputGroup 
        labelFor="name"
        labelText="Name:"
        inputType="text"
        inputName="name"
        inputClass="w-100"
        inputPlaceholder="Enter Show Name"
        onChange={this.updateName}
        />
    )
  }

  createNetworkDropwdown = networks => {
    return (
      <p>
        <label className="flex pv2" htmlFor="network">Network: <Required /></label>
        <select className="black bg-white w-100" name="network" onChange={this.updateNetwork}>
          <option>Select your network</option>
          {networks.map(network => (
            <option key={network.id} value={network.network_id}>{network.title}</option>
          ))}
        </select>
      </p>
    )
  }

  createTimeDropdown = () => {
    return ( 
      <p>
        <label className="flex pv2" htmlFor="showNetwork">Time Expected to Complete:</label>
        <select className="black bg-white w-100" name="showNetwork" onChange={this.updateShowTime}>
          <option>Select your time</option>
          <option value="1-10hrs">1-10hrs</option>
          <option value="10-20hrs">10-20hrs</option>
          <option value="20-30hrs">20-30hrs</option>
          <option value="30-40hrs">30-40hrs</option>
          <option value="50-60hrs">50-60hrs</option>
        </select>
      </p>
    )
  }

  createNotes = () => {
    return (
      <p>
        <label className="flex" htmlFor="notes">Notes: </label>
        <textarea className="ba db b--black-20 pa2 mb2 w-100" onChange={this.updateContent} />
      </p>
    )
  }

  createShowComplete = currentShow => {
    return (
      <p className="flex justify-between">
        <label className="" htmlFor="currentShow">Current Show:</label>
        <input 
          type="checkbox"
          name="currentShow"
          checked={currentShow}
          onChange={this.updateCurrentShow}
          />
      </p>
    )
  }

  render() {
    const { networks } = this.context
    const { currentShow } = this.state

    return (
      <form className="br1 measure mv4 pa3 shadow-3 center" onSubmit={this.handleSubmit}>
        <fieldset className="bn w-70 center">
          <legend className="f3 tc">Add a new show to watch!</legend>
          <ValidationError
            hasError={!this.state.titleValid}
            message={this.state.validationMessages.name}
          />
          { this.createInput() }
          { this.createNetworkDropwdown(networks) }
          { this.createTimeDropdown() }
          { this.createNotes() }
          { this.createShowComplete(currentShow) }
          <button type="submit" disabled={!this.state.formValid} className="black bg-white hover ph3 pv2 db center">Submit</button>
        </fieldset>
      </form>
    )
  }
}

export default AddShowForm