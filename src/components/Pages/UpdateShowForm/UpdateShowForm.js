import React, { Component } from "react";

import { ValidationError, Required, InputGroup } from '../../Utils/Utils'

import ShowsContext from '../../../context/ShowsContext'
import ShowApiService from "../../../services/show-api-service";

class UpdateShowForm extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      title: "",
      networkId: "",
      currentShow: false,
      notes: "",
      updateShowTime: "",
      updateComplete: false,
      titleValid: false,
      formValid: false,
      validationMessages: {
        title: ""
      }
    };
  }

  static contextType = ShowsContext

  componentDidMount() {
    const showId = parseInt(this.props.match.params.showId)
    const { shows } = this.context
    shows.map(show => {
      if(show.is_complete) {
        this.setState({
          updateCompleteDisabled: true
        })
      }
      return ""
    })

    ShowApiService.getUserShow(showId)
    .then(show => {
      const { title, network_id, time_to_complete, notes, current_show, is_complete } = show[0]
      this.setState({
        id: showId,
        title,
        networkId: network_id,
        notes,
        currentShow: current_show,
        updateShowTime: time_to_complete,
        updateComplete: is_complete
      })
    })
  }
  
  updateTitle = e => this.setState({ title: e.target.value }, () => {this.validateTitle()});
  
  updateContent = e => this.setState({ notes: e.target.value });
  
  updateCurrentShow = () => this.setState({ currentShow: !this.state.currentShow });
  
  updateShowComplete = () => this.setState({ updateComplete: !this.state.updateComplete });
  
  updateShowTime = e => this.setState({ updateShowTime: e.target.value });
  
  updateNetwork = e => {
    const { networks } = this.context
    const selectedNetwork = networks.filter(cId => parseInt(cId.network_id) === parseInt(e.target.value));
    const newNetworkId = parseInt(selectedNetwork[0].network_id)
    
    this.setState({ networkId: newNetworkId }, this.formValid)
  }

  validateTitle() {
    const { title } = this.state
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    if (title.length === 0) {
      fieldErrors.name = "Name is required";
      hasError = true;
    } else {
      if (title.length < 2) {
        fieldErrors.name = "Name must be at least 2 characters long";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        titleValid: !hasError
      },
      this.formValid
    );
  }

  formValid = () => {
    const { titleValid } = this.state;
    this.setState({
      formValid: titleValid
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { id, title, networkId, currentShow, notes, updateShowTime, updateComplete } = this.state;
    const show = {
      id,
      title,
      network_id: networkId,
      current_show: currentShow,
      notes,
      time_to_complete: updateShowTime,
      is_complete: updateComplete
    }
    ShowApiService.updateUserShow(show, id)
    .then(updatedShow => {
      console.log(updatedShow)
    })
    .catch(error => console.error({ error }))
    this.context.updateShow(show)
    this.props.history.push(`/app/network/${show.network_id}`)
  };

  createInput = inputValue => {
    return (
      <InputGroup 
        labelFor="name"
        labelText="Name:"
        inputType="text"
        inputName="name"
        inputClass="w-100"
        inputValue={inputValue}
        inputPlaceholder="Edit Show Name"
        onChange={this.updateTitle}
        />
    )
  }

  createNetworkDropwdown = (networks, networkId) => {
    return (
      <p>
        <label className="flex pv2" htmlFor="network">Network: <Required /></label>
        <select className="black bg-white w-100" name="network" value={networkId} onChange={this.updateNetwork}>
          <option>Select your network</option>
          {networks.map(network => (
            <option key={network.id} value={network.network_id}>{network.title}</option>
          ))}
        </select>
      </p>
    )
  }

  createTimeDropdown = updateShowTime => {
    return ( 
      <p>
        <label className="flex pv2" htmlFor="showNetwork">Time Expected to Complete:</label>
        <select className="black bg-white w-100" name="showNetwork" value={updateShowTime} onChange={this.updateShowTime}>
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

  createNotes = noteValue => {
    return (
      <p>
        <label className="flex" htmlFor="notes">Notes: </label>
        <textarea className="ba db b--black-20 pa2 mb2 w-100" onChange={this.updateContent} value={noteValue} />
      </p>
    )
  }

  createCheckbox = (currentShowLabel, currentShow, updateMethod) => {
    return (
      <p className="flex justify-between">
        <label className="" htmlFor="currentShow">{currentShowLabel}</label>
        <input 
          type="checkbox"
          name="currentShow"
          checked={currentShow}
          onChange={updateMethod}
          />
      </p>
    )
  }

  render() {
    const { networks } = this.context
    const { title, networkId, currentShow, notes, updateShowTime, updateComplete } = this.state

    return (
        <form className="br1 measure mv4 pa3 shadow-3 center" onSubmit={this.handleSubmit}>
          <fieldset className="bn w-70 center">
            <legend className="f3 tc">Update show!</legend>
            <ValidationError
              hasError={!this.state.titleValid}
              message={this.state.validationMessages.name}
            />
            { this.createInput(title) }
            { this.createNetworkDropwdown(networks, networkId) }
            { this.createTimeDropdown(updateShowTime) }
            { this.createNotes(notes) }
            { this.createCheckbox("Current Show:", currentShow, this.updateCurrentShow) }
            { this.createCheckbox("Show Completed?", updateComplete, this.updateShowComplete) }
            <button type="submit" className="black bg-white hover ph3 pv2 db center">Submit</button>
          </fieldset>
        </form>
    );
  }
}

export default UpdateShowForm;