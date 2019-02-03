import React,{PureComponent} from 'react';
import { worker, isLibraryLoaded } from '../library'
import Search from '../Search'
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
        <span>THE LIBRARY</span>
        <span>{!this.state.loaded ? 'loading...' : <Search/> }</span>
      </header>
    )
  }
}

export default Header;
