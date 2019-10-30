import React, { PureComponent, Suspense } from 'react'

import { ShowError } from '../../Utils/Utils'

import ShowsContext from '../../../context/ShowsContext'
const Show = React.lazy(() => import('../../Show/Show'))

class ShowCompletedMain extends PureComponent {
    static contextType = ShowsContext;
    render() {
        const getCompletedShows = (shows = []) => shows.filter(show => show.is_complete === true);   

        const { shows } = this.context
        const showsCompleted = getCompletedShows(shows);
        return (
            <ShowError>
                <ul className="grid w-100 pa0 ma0">
                    {showsCompleted.map(show => (
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

export default ShowCompletedMain