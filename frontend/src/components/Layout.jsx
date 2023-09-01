import React from 'react'
import NavBar from './NavBar'

const Layout = ({navBar = true, children}) => {
  return (
    <>
        {navBar && <NavBar/>}
        <div className='container mt-3'>{children}</div>
    </>
    
  )
}

export default Layout;