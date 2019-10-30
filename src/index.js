import React from 'react'
import ReactDOM from 'react-dom'
import './root.css'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<BrowserRouter><Home /></BrowserRouter>, document.getElementById('root'))

serviceWorker.unregister()