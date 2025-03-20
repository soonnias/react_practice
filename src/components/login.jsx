import { useState } from 'react'
import { validateEmail } from '../validation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    if (validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: '' }))
    } else if (touched.email) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }))
    }
  }

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(email) ? '' : 'Invalid email format',
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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const isFormValid = !errors.email && !errors.password && email && password

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title text-center">Login</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                />
                {touched.email && errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
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
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
