import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({refreshPara}) => {
  return (
    <div className='header-main'>
      <div className="header-container">
      <div className="header-main-left">
        <Link to="/"><img src="/images/inner-logo-home.jpg" alt="logo" id='header-logo'/></Link>
        <div className="header-icons">
        <img src="/images/icons-keyboard.png" alt="" id='header-key' onClick={refreshPara}/>
        <img src="/images/icons8-crown-30.png" alt="" id='header-crown'/>
        <img src="/images/icons8-i-50.png" alt="" id='header-info'/>
        <img src="/images/icons8-setting-50.png" alt="" id='header-setting'/>
        </div>
      </div>
      <div className="header-main-right">
        <img src="/images/icons8-sun-50.png" alt="" id='header-theme'/>
        <Link to="/signup"><img src="/images/icons8-person-50.png" alt="" id='header-login'/></Link>
      </div>
      </div>
    </div>
  )
}

export default Header
