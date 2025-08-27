import React from 'react'
import Sidebar from '../../components/DesignContents/Sidebar'
const Dashboard = () => {
  return (
    <div className='bg-[#f4f2ee] flex  justify-between p-6'>
      <Sidebar />
      <main>
        <h1>Dashboard</h1>
      </main>
      <Sidebar />
    </div>
  )
}

export default Dashboard
