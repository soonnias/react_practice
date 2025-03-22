// Navigation.js
import { useAuth } from '../auth/AuthContext'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2 shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h3 className="text-white mb-0">
          <Link to="/" className="text-white text-decoration-none">
            Peoples
          </Link>
        </h3>
        <div>
          {isLoggedIn ? (
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
