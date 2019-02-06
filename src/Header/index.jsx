import React, { PureComponent } from 'react'
import Search from '../Search'
import Sort from '../Sort'
import lib from '../libraryLoader'
import './styles.scss'

class Header extends PureComponent {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
    lib.worker.addEventListener('message', this.updateFlag.bind(this))
  }
  updateFlag() {
    if (lib.isLibraryLoaded()) {
      this.setState({
        loaded: true
      })
    }

  }
  render() {
    return (
      <header className="header">
        <span className="header__title">THE LIBRARY</span>
        {!this.state.loaded ? 'loading...' :
          <div className="header__options">
            <Sort />
            <Search />
          </div>
        }
      </header>
    )
  }
}

export default Header
