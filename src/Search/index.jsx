import React from 'react'
import './styles.scss'
import conf from '../configuration'
// const dropdownOptions = conf.bookProperties.map(prop => <a href={selectoption()})

const Search = () => {
  return (
    <div className="dropdown">
      <button onClick={()=>{}} className="dropbtn">Dropdown</button>
      <div id="myDropdown" className="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  )
}

export default Search;
