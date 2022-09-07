import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"

const Navbar = () => {

  return (
    <div className='mnheader'>
      <div className='ch1'>
        <span>Admin Pannel</span>
      </div>
      <div className='ch2'>
        <Link className='link' to="/"><span>Questions</span></Link>
        <Link className='link' to="/addquestion"><span>AddNew</span></Link>
      </div>
    </div>
  )
}

export default Navbar