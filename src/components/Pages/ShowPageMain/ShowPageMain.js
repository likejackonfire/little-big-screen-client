import React, { PureComponent, Suspense } from 'react'

import { ShowError } from '../../Utils/Utils'

import ShowsContext from '../../../context/ShowsContext'
const Show = React.lazy(() => import('../../Show/Show'))

class ShowPageMain extends PureComponent {
    static contextType = ShowsContext
    render() {
        const getShowsForConsole = (shows = [], consoleId) => !consoleId ? shows : shows.filter(show => show.console_id === consoleId && show.is_complete !== true)  
        
        const { consoleId } = this.props.match.params
        const { shows } = this.context
        
        const showsFromConsole = getShowsForConsole(shows, parseInt(consoleId))
        return (
            <ShowError>
                <ul className="grid w-100 pa0 ma0">
                    {showsFromConsole.map(show => (
                        <li className="list" key={show.id}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Show 
                                    id={show.id}
                                    title={show.title}
                                />
                            </Suspense>
                        </li>
                    ))}
                </ul>
            </ShowError>
        )
    }
}

export default ShowPageMain