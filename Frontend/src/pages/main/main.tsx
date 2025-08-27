import React from 'react'
import AppSidebar from '../../components/DesignContents/Sidebar'
import { SidebarProvider } from '../../components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/DesignContents/Navbar'
const main = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Navbar/>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default main
