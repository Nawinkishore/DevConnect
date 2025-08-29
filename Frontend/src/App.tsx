
import { Routes, Route, Navigate } from 'react-router-dom'
import SideContent from './components/auth/SideContent'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/pages/Dashboard'
import  { useSelector }  from 'react-redux'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Main from './pages/main/main'
import Profile from './pages/pages/Profile'
import CheckAuth from './pages/pages/CheckAuth'
const App = () => {

  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
  return (
  
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
        <Route
          path="/auth/sign-in"
          element={
            user ? <Navigate to="/" replace /> :
            <SideContent title="Welcome Back!" message="Please sign in to your account.">
              <SignIn />
            </SideContent>
          }
        />
        <Route
          path="/auth/sign-up"
          element={
            user ? <Navigate to="/" replace /> :
            <SideContent title="Join Us!" message="Create your account to get started.">
              <SignUp />
            </SideContent>
          }
        />
        <Route path="/" element={<CheckAuth><Main /></CheckAuth>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App