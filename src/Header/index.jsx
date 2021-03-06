import React, { PureComponent } from 'react'
import Search from '../Search'
import Sort from '../Sort'
import {worker, isLibraryLoaded} from '../libraryLoader'
import './styles.scss'

class Header extends PureComponent {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
    worker.addEventListener('message', this.updateFlag.bind(this))
  }
  updateFlag() {
    if (isLibraryLoaded()) {
      this.setState({
        loaded: true
      })
    }

  }
  render() {
    return (
      <header className='header'>
        <span className='header__title'>THE LIBRARY</span>
        {!this.state.loaded ?
          <div className='header__loading'>Loading</div>:
          <div className='header__options'>
            <Sort />
            <Search />
          </div>
        }
      </header>
    )
  }
}

export default Header
