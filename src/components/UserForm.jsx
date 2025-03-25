import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { validateEmail, validatePhone } from '../validation/validation'
import { createUser, getUserById, updateUser } from '../api/api'

const UserForm = ({ role = 'create' }) => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
  })
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    server: '',
  })
  const [user, setUser] = useState({})
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserById = async (id) => {
      if (role !== 'create') {
        try {
          setLoading(true)
          const response = await getUserById(id)
          setUser(response)

          setFormData({
            firstName: response.firstName || '',
            lastName: response.lastName || '',
            email: response.email || '',
            phone: formatPhoneNumber(response.phone?.replace(/\D/g, '') || ''),
            age: response.age?.toString() || '',
          })
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            server: error.message || 'Something went wrong.',
          }))
          navigate(-1)
        } finally {
          setLoading(false)
        }
      }

      setLoading(false)
    }

    fetchUserById(id)
  }, [id, role])

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '')

    let formattedPhone = ''

    if (phoneNumber.length > 0) {
      formattedPhone += '+'
    }

    if (phoneNumber.length > 0) {
      formattedPhone += phoneNumber.slice(0, 2)
    }

    if (phoneNumber.length > 2) {
      formattedPhone += ' ' + phoneNumber.slice(2, 5)
    }

    if (phoneNumber.length > 5) {
      formattedPhone += '-' + phoneNumber.slice(5, 8)
    }

    if (phoneNumber.length > 8) {
      formattedPhone += '-' + phoneNumber.slice(8, 12)
    }

    return formattedPhone
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Спеціальна обробка для номера телефону
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value)
      setFormData({ ...formData, [name]: formattedPhone })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}

    Object.keys(formData).forEach((field) => {
      if (field !== 'server') {
        const error = validateField(field, formData[field])
        if (error) {
          newErrors[field] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }))
      return
    }

    try {
      setIsSubmitting(true)
      if (role === 'create') {
        await createUser(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.phone,
          formData.age
        )
      } else {
        await updateUser(
          id,
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.phone,
          formData.age
        )
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
      })

      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        server: '',
      })

      navigate(-1)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors((prevErrors) => ({
        ...prevErrors,
        server:
          typeof error.message === 'string'
            ? error.message
            : 'Something went wrong.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateField = (name, value) => {
    let error = ''

    if (typeof value !== 'string') {
      value = String(value)
    }

    if (!value.trim()) {
      error = `This field is required`
    } else {
      switch (name) {
        case 'email':
          if (!validateEmail(value)) {
            error = 'Invalid email format'
          }
          break
        case 'phone':
          if (!validatePhone(value)) {
            error = 'Invalid phone format'
          }
          break
        case 'age':
          if (isNaN(value) || value < 1) {
            error = 'Age must be a positive number'
          }
          break
        default:
          break
      }
    }
    return error
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
  }

  useEffect(() => {
    const allFieldsFilled = Object.keys(formData).every(
      (key) => formData[key] !== '' && !errors[key]
    )

    setIsSubmitDisabled(!allFieldsFilled)
  }, [formData, errors])

  return (
    <div className="container d-flex justify-content-center align-items-center">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center flex-grow-1"
          style={{ minHeight: 0 }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card w-100">
          <div className="card-header">
            <h5 className="card-title text-center">
              {role !== 'create'
                ? `${user.firstName} ${user.lastName}`
                : 'New user'}
            </h5>
          </div>
          <div className="card-body">
            {errors.server && (
              <div className="alert alert-danger">{errors.server}</div>
            )}
            <form onSubmit={handleSubmit}>
              {['firstName', 'lastName', 'email', 'phone', 'age'].map(
                (field) => {
                  const fieldLabels = {
                    firstName: 'First name',
                    lastName: 'Last name',
                    email: 'Email',
                    phone: 'Phone',
                    age: 'Age',
                  }

                  return (
                    <div className="mb-3" key={field}>
                      <label className="form-label" htmlFor={field}>
                        {fieldLabels[field]}
                      </label>
                      <input
                        type={
                          field === 'phone'
                            ? 'tel'
                            : field === 'age'
                              ? 'number'
                              : 'text'
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={
                          field === 'phone' ? '+38 000-000-0000' : ''
                        }
                        className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                      />
                      {errors[field] && (
                        <div className="invalid-feedback">{errors[field]}</div>
                      )}
                    </div>
                  )
                }
              )}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitDisabled || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserForm
