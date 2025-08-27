
import { Routes, Route } from 'react-router-dom'
import SideContent from './components/auth/SideContent'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/pages/Dashboard'

import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Main from './pages/main/main'
import Profile from './pages/pages/Profile'
const App = () => {


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
      <Route path="/" element={<Main />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile/>} />
        {/* Add more child pages here */}
      </Route>
    </Routes>
    
    
    </div>
    
  )
}

export default App