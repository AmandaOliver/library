import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Catalog from './Catalog'
import { initializeLibrary } from './library'

const Library = () => (
  <Fragment>
    <Header />
    <Catalog />
  </Fragment>
)

initializeLibrary()
ReactDOM.render(<Library />, document.getElementById('root'))
