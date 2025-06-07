import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from '../Layout/Navbar'

const Header = () => {
  return (
    <div className="border-b border-gray-200">
        
      <Topbar/>
      <Navbar/>
      {/* <Cart Drawer/> */}
    </div>
  )
}

export default Header
