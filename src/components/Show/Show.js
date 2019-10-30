import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPenSquare } from '@fortawesome/free-solid-svg-icons'

import ShowsContext from '../../context/ShowsContext'
import ShowApiService from "../../services/show-api-service";

class Show extends PureComponent {

  static contextType = ShowsContext

  handleDeleteShow = e => {
    e.preventDefault()
    const { id } = this.props
    ShowApiService.deleteUserShow(parseInt(id))
    .then(message => this.context.deleteShow(id))
  }

  render() {
    const { id, title } = this.props
    return (
      <div className="grow w-100">
        <header>
          <h2 className="tc">{title}</h2>
        </header>

        <div className="w-100 showCard bg-black"></div>

        <div className="flex justify-between">
            <Link to={`#`} className="pv2" onClick={this.handleDeleteNote}><FontAwesomeIcon style={{color: "#C20500", fontSize: "1.3em"}} onClick={this.handleDeleteShow} icon={faMinusSquare} /></Link>
            <Link to={`/app/updateShow/${id}`} className="pv2"><FontAwesomeIcon style={{color: "#00FAAB", fontSize: "1.3em"}} icon={faPenSquare} /></Link>
        </div>
      </div>
    )
  }
}

Show.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Show