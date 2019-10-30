import React, { PureComponent } from "react"

import ShowsContext from "../../../context/ShowsContext"

class NetworkPageNav extends PureComponent {
    static contextType = ShowsContext
    render() {
        const findShow = (shows = [], showId) => shows.find(show => show.id === showId)

        const findNetwork = (networks = [], networkId) => networks.find(network => network.id === networkId)

        const { networks, shows } = this.context

        const { showId } = this.props.match.params

        const note = findShow(shows, showId) || {};
        const network = findNetwork(networks, note.folderId);

        return (
            <>
                <span className ="hover w-100 ba pa2 db tc" onClick={this.props.history.goBack}>Back</span>

                {network && <h3>{network.name}</h3>}
            </>
        )
    }
}

NetworkPageNav.defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };

export default NetworkPageNav