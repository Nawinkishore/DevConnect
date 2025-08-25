
import { Routes, Route } from 'react-router-dom'
import SideContent from './components/auth/SideContent'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import { useEffect } from 'react'
const App = () => {
  useEffect(() => {
    // Check for token expiration and refresh if necessary
  }, [])

  return (
    <div>
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
    </Routes>
    
    </div>
    
  )
}

export default App