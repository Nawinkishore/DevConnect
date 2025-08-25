
import { Routes, Route } from 'react-router-dom'
import SideContent from './components/auth/SideContent'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
// import { useEffect } from 'react'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { toast }  from 'react-toastify'
import api from './api/api'
import Dashboard from './pages/dashboard/Dashboard'
const App = () => {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await api.get('/auth/refresh');
  //       toast.success('Token refreshed successfully');
  //     } catch (error) {
  //       toast.error('Error refreshing token');
  //     }
  //   };

  //   checkAuth();
  // }, [])

  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
      <Route
        path="/auth/sign-in"
        element={
          <SideContent title="Welcome Back!" message="Please sign in to your account.">
            <SignIn />
          </SideContent>
        }
      />
      <Route
        path="/auth/sign-up"
        element={
          <SideContent title="Join Us!" message="Create your account to get started.">
            <SignUp />
          </SideContent>
        }
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
    
    
    </div>
    
  )
}

export default App