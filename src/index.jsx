import React from 'react'
import ReactDOM from 'react-dom'
import Library from './Library'
import {initializeLibrary} from './libraryLoader'

initializeLibrary()

ReactDOM.render(<Library />, document.getElementById('root'))
