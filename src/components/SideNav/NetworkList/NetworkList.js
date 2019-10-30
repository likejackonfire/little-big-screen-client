import React, { PureComponent } from 'react'
import { NavLink, Link } from 'react-router-dom'

import ShowsContext from '../../../context/ShowsContext'

class NetworkList extends PureComponent{
    static contextType = ShowsContext;
    render() {
        const { networks, shows } = this.context

        const getAllUncompletedShows= (shows = []) => shows.filter(show => show.is_complete !== true).length
        const countShowsForNetwork = (shows = [], networkId) => shows.filter(show => show.network_id === networkId && show.is_complete !== true).length
        const countCompletedShows = (shows = []) => shows.filter(show => show.is_complete === true).length
        return (
            <>
                <ul className="w-100 pa0 ma0">
                    <NavLink className="no-underline" to={`/app`}>
                        <li className="hover black w-100 ba pa3 tc no-underline">
                            { getAllUncompletedShows(shows) } In The Backlog
                        </li>
                    </NavLink>
                    <NavLink className="no-underline" to={`/app/network`}>
                        <li className="hover black w-100 ba pa3 db tc">
                            { countCompletedShows(shows) } Completed Shows
                        </li>
                    </NavLink>
                    {networks.map(network => (
                        <NavLink className="no-underline" to={`/app/network/${network.network_id}`} key={network.network_id}>
                            <li className="hover black w-100 ba pa3 db tc">
                                { countShowsForNetwork(shows, network.network_id) } { network.title }
                            </li>
                        </NavLink>
                    ))}
                </ul>

                <Link style={{textDecoration: "none"}} to="/app/addNetwork">
                    <div className="black bg-white hover w-100 ba pa3 db tc">+ Network</div>
                </Link>
                
                { networks.length 
                ? <Link style={{textDecoration: "none"}} to="/app/addShow">
                    <div className="black bg-white hover w-100 ba pa3 db tc">+ Show</div>
                  </Link>
                : "" }
            </>
        )
    }
}

NetworkList.defaultProps = {
    networks: []
  };

export default NetworkList