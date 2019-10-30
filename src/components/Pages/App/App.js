import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { NetworkList, NetworkPageNav } from '../../SideNav'

import ShowsContext from '../../../context/ShowsContext'

import NetworkApiService from '../../../services/network-api-service'
import ShowApiService from '../../../services/show-api-service'

const ShowPageMain  = React.lazy(() => import('../ShowPageMain/ShowPageMain'))
const AllShowsPageMain  = React.lazy(() => import('../AllShowsPageMain/AllShowsPageMain'))
const ShowCompletedMain  = React.lazy(() => import('../ShowCompletedMain/ShowCompletedMain'))
const AddNetworkForm  = React.lazy(() => import('../AddNetworkForm/AddNetworkForm'))
const AddShowForm  = React.lazy(() => import('../AddShowForm/AddShowForm'))
const UpdateShowForm  = React.lazy(() => import('../UpdateShowForm/UpdateShowForm'))

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          networks: [],
          shows: [],
          error: "",
          showNav: true
        }
    }

    componentDidMount() {
        NetworkApiService.getUserNetworks()
        .then(networks => {
            const userNetworks = networks.sort((a, b) => a.title.localeCompare(b.title))
            this.setState({ networks: userNetworks })
        })
        ShowApiService.getUserShows()
        .then(shows => this.setState({ shows }))
    }

    handleAddNetwork = network => {
        const { networks } = this.state
        const userNetworks = [...networks , network]
        const sortedNetworks = userNetworks.sort((a, b) => a.title.localeCompare(b.title))
        this.setState({ networks: sortedNetworks })
    }
    
    handleAddShow = show => {
        const newShows = [...this.state.shows, show]
        this.setState({
          shows: newShows
        })
    }
    
    handleUpdateShow = updatedShow => {
        const { shows } = this.state
        const updatedShows = shows.map(show => 
            (parseInt(show.id) === parseInt(updatedShow.id))
              ? updatedShow
              : show
        )
        this.setState({
          shows: updatedShows
        })
    }
    
    handleDeleteShow = showId => {
        const { shows } = this.state
        const newShows = shows.filter(show => show.id !== showId)
        this.setState({
            shows: newShows
        })
    }

    showNav = () => this.setState({ showNav: !this.state.showNav })

    createNetworkNav = () => {
        const { showNav } = this.state
        return (
            <>
                <nav className="vh-100 dt">
                    <span className={`fl w-100 ${showNav ? "w-100-ns" : "dn"}`}>
                        <Switch>
                            <Route exact path="/app" component={NetworkList} />
                            <Route path="/app/network/:networkId" component={NetworkList} />
                            <Route path="/app/network" component={NetworkList} />
                            <Route path="/app/show/:showId" component={NetworkPageNav} />
                            <Route path="/app/addNetwork" component={NetworkPageNav} />
                            <Route path="/app/addShow" component={NetworkPageNav} />
                            <Route path="/app/updateShow/:showId" component={NetworkPageNav} />
                        </Switch>
                    </span>
                    <span className="pointer dtc v-mid tc pa1 b" onClick={this.showNav}>{showNav ? "<" : ">"}</span>
                </nav>
            </>
        )
    }

    createNetworkMain = () => {
        return (
            <>
                <main className="fl w-100 w-100-ns pa3">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/app" component={AllShowsPageMain} />
                            <Route path="/app/network/:networkId" component={ShowPageMain} />
                            <Route path="/app/network" component={ShowCompletedMain} />
                            <Route path="/app/addNetwork" component={AddNetworkForm} />
                            <Route path="/app/addShow" component={AddShowForm} />
                            <Route path="/app/updateShow/:showId" component={UpdateShowForm} />
                        </Switch>
                    </Suspense>
                </main>
            </>
        )
    }

    render() {
        const { networks, shows } = this.state
        const contextValue = { 
            networks,
            shows,
            deleteShow: this.handleDeleteShow,
            addNetwork: this.handleAddNetwork,
            addShow: this.handleAddShow,
            updateShow: this.handleUpdateShow,
        }

        return (
            <ShowsContext.Provider value={contextValue}>
                <div className="flex center">
                    {this.createNetworkNav()}
                    {this.createNetworkMain()}
                </div>
            </ShowsContext.Provider>
        )
    }
}

export default App