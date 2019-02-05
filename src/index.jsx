import React from 'react'
import ReactDOM from 'react-dom'
import Library from './Library'
import lib from './libraryLoader'

lib.initializeLibrary()

ReactDOM.render(<Library />, document.getElementById('root'))
