import React, { PureComponent } from 'react';
import Search from '../Search'
import { worker, isLibraryLoaded } from '../library'
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
      <header className="header">
        <span className="header__title">THE LIBRARY</span>
        {!this.state.loaded ? 'loading...' : <Search />}
      </header>
    )
  }
}

export default Header;
