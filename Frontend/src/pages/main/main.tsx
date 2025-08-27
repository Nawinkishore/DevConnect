
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/DesignContents/Navbar'
const main = () => {
  return (
    <div className='fixed top-0 left-0 right-0 z-10'>
      <Navbar  />
      <main className='h-screen'>
        <Outlet />
      </main>
    </div>
  )
}

export default main
