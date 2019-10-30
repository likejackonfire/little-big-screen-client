import React, { PureComponent, Suspense } from 'react'

import { ShowError } from '../../Utils/Utils'

import ShowsContext from '../../../context/ShowsContext'

const Show = React.lazy(() => import('../../Show/Show'))

class AllShowsPageMain extends PureComponent {
    static contextType = ShowsContext
    render() {
        const getShowsForNetwork = (shows = []) => shows.filter(show => show.current_show !== true && show.is_complete !== true)     
        const getCurrentShow = (shows = []) => shows.filter(show => show.current_show === true && show.is_complete !== true) 
        
        const { shows } = this.context
        
        const showsFromNetwork = getShowsForNetwork(shows)
        const currentShows = getCurrentShow(shows)

        const displayCurrentShows = shows => {
            return (
                <div>
                    <div className="ba pa4">
                        <header>
                            <h2 className="tc">Current Shows</h2>
                        </header>

                        <Suspense fallback={<div>Loading...</div>}>
                            <ul className="w-100 pa0 ma0">
                                { shows.map(show => (
                                    <li className="list" key={show.id}>
                                        <Show 
                                            id={show.id}
                                            title={show.title}
                                            />
                                    </li>
                                ))}
                            </ul>
                        </Suspense>
                    </div>
                </div>
            )
        }

        const displayShows = shows => {
            return (
                <ul className="grid w-100 pa0 ma0">
                    {shows.map(show => (
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
            )
        }

        return (
            <ShowError>
                { currentShows.length ? displayCurrentShows(currentShows) : "" }
                { displayShows(showsFromNetwork) }
            </ShowError>
        )
    }
}

export default AllShowsPageMain