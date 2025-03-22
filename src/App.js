// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Navigation from './components/navigation'
import Login from './components/login'
import Dashboard from './components/dashboard'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

const PublicPage = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <div className="flex-grow-1 d-flex">{children}</div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicPage>
                <Login />
              </PublicPage>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <Dashboard />
                </PublicPage>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
