import { useState } from 'react'
import { login as apiLogin } from '../api/api'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    server: '',
  })
  const [touched, setTouched] = useState({ username: false, password: false })
  const [isLoading, setIsLoading] = useState(false)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setUsername(value)

    if (value.length >= 3) {
      setErrors((prev) => ({ ...prev, username: '' }))
    } else if (touched.username) {
      setErrors((prev) => ({
        ...prev,
        username: 'Username must be at least 3 characters',
      }))
    }
  }

  const handleUsernameBlur = () => {
    setTouched((prev) => ({ ...prev, username: true }))
    setErrors((prev) => ({
      ...prev,
      username:
        username.length >= 3 ? '' : 'Username must be at least 3 characters',
    }))
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)

    if (value.length >= 6) {
      setErrors((prev) => ({ ...prev, password: '' }))
    } else if (touched.password) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 6 characters',
      }))
    }
  }

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }))
    setErrors((prev) => ({
      ...prev,
      password:
        password.length >= 6 ? '' : 'Password must be at least 6 characters',
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors((prev) => ({ ...prev, server: '' }))

    if (!isFormValid) return

    try {
      setIsLoading(true)
      const token = await apiLogin({ username, password })
      authLogin(token)

      setUsername('')
      setPassword('')
      setErrors({
        username: '',
        password: '',
        server: '',
      })

      navigate('/users')
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: error.message }))
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    !errors.username && !errors.password && username && password

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-sm-10">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title text-center">Login</h5>
            </div>
            <div className="card-body">
              {errors.server && (
                <div className="alert alert-danger">{errors.server}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameBlur}
                    required
                  />
                  {touched.username && errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    required
                  />
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={!isFormValid || isLoading}
                >
                  {!isLoading ? 'Sign in' : 'In progress...'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
