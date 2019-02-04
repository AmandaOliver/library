import React, { PureComponent } from 'react';
import Search from '../Search'
import { worker, isLibraryLoaded } from '../library'
import './styles.scss'

class Header extends PureComponent {
  constructor() {
    super()
    this.state = {
      libraryLoaded: false
    }
    worker.addEventListener('message', this.updateFlag.bind(this))
  }
  //TR: add docuentation for your methods

  updateFlag() {
    if (isLibraryLoaded()) {
      this.setState({
        libraryLoaded: true
      })
    }

  }
  render() {
    return (
      <header className="header">
        <span className="header__title">THE LIBRARY</span>
        {!this.state.libraryLoaded ? 'loading...' : <Search />}
      </header>
    )
  }
}

export default Header;
