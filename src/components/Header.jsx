import { useAuth } from '../auth/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <Link to="/users" className="text-white text-decoration-none">
            <h3 className="mb-0 fs-4 fs-md-3">Peoples</h3>
          </Link>
        </div>

        <div>
          {isLoggedIn ? (
            <button
              type="button"
              className="btn btn-outline-light btn-sm py-1 px-2 py-md-2 px-md-3"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline-light btn-sm py-1 px-2 py-md-2 px-md-3"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
