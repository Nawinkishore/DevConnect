
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/DesignContents/Navbar'
const main = () => {
  return (
    <div className='h-screen' >
      <div className='fixed top-0 left-0 right-0 z-10'>
        <Navbar />
      </div>

      <main className='mt-24 p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default main
