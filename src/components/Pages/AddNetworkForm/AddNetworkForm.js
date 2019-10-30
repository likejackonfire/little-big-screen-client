import React, { Component } from "react"

import { Required } from '../../Utils/Utils'

import ShowsContext from '../../../context/ShowsContext'

import NetworkApiService from '../../../services/network-api-service'

class AddNetworkForm extends Component {
  constructor() {
    super()
    this.state = {
      networkId: "",
      networkName: "",
      networkValid: false,
      formValid: false,
      networkOptions: []
    }
  }

  componentDidMount() {
    const networkOptionTitle = {
      id: "29345-sdf234",
      title: "Select your network"
    }

    NetworkApiService.getNetworks()
      .then(networks => {
        const userNetworks = networks.sort((a, b) => a.title.localeCompare(b.title))
        this.setState({
          networkOptions: [networkOptionTitle, ...userNetworks]
        })
      })
  }

  static contextType = ShowsContext

  updateNetwork = e => {
    let hasError = false
    const network = this.state.networkOptions.filter(cId => cId.title === e.target.value)
    const networkIdStr = network[0].id
    if (networkIdStr !== '29345-sdf234') {
      this.setState(
        {
          networkId: networkIdStr,
          networkName: e.target.value,
          networkValid: !hasError
        },
        this.formValid
      )
    } else {
      this.setState({ networkValid: false },
        this.formValid
      )
    }
  }

  formValid = () => this.setState({ formValid: this.state.networkValid })

  handleSubmit = e => {
    e.preventDefault()
    const { networkId, networkName } = this.state 
    NetworkApiService.postUserNetwork(networkId)
      .then(newNetwork => {
        const newNetworkContext = {
          title: networkName,
          ...newNetwork
        }
        this.context.addNetwork(newNetworkContext)
        this.props.history.push(`/app`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
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

  render() {
    const { networkOptions } = this.state
    const { networks } = this.context
    const networkChoices = networkOptions.filter(networkOption => !networks.some(network => network.network_id === networkOption.id))

    return (
      <form className="br1 measure mv4 pa3 shadow-3 center"  onSubmit={this.handleSubmit}>
        <fieldset className="bn">
          <legend className="f3 tc">Add a Network</legend>
          { this.createNetworkDropwdown(networkChoices) }
          <button type="submit" disabled={!this.state.formValid} className="black bg-white hover pa2 mv2 db center">Submit</button>
        </fieldset>
      </form>
    )
  }
}

export default AddNetworkForm