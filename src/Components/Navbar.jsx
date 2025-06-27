import React from 'react'
import './Navbar.css'
import History from './History'
import MainPage from './Main-page'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    {/* <div className="bar"> */}
    <div className="Navbar">
      <Link to="/Main"><h4>BLogMaker</h4></Link>
       <Link to="/history"><p>History</p></Link>
    </div>
    {/* </div> */}
    </>
  )
}

export default Navbar