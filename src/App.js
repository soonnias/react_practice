import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Header from './components/Header'
import Login from './components/Login'
import Dashboard from './components/dashboard'
import UserList from './components/UserList'
import UserCard from './components/UserCard'
import UserForm from './components/UserForm'

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
      <Header />
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

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserList />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserCard />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/add"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserForm role="create" />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserForm role="edit" />
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
