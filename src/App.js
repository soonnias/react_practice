import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Header from './components/Header'
import Login from './components/Login'
import UserList from './components/UserList'
import UserCard from './components/UserCard'
import UserForm from './components/UserForm'
import UserDetails from './components/UserDetails'

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
            path="/"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserList />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserDetails />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/add"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserForm role="create" />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/edit/:id"
            element={
              <ProtectedRoute>
                <PublicPage>
                  <UserForm role="edit" />
                </PublicPage>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
