import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserById } from '../api/api'

const UserCard = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await getUserById(id)
        setUser(response)
      } catch (error) {
        setError(error.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  return (
    <div className="container d-flex flex-column vh-85 mt-3 align-items-center justify-content-center">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '85vh' }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="card shadow-lg p-4 my-2"
          style={{
            maxWidth: '600px',
            width: '100%',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="row g-3">
            {/* Ліва частина з фото */}
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="img-fluid rounded-circle"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  border: '2px solid #ddd',
                }}
              />
            </div>
            {/* Права частина з інформацією про користувача */}
            <div className="col-md-8">
              <h3 className="mb-3">
                {user.firstName} {user.lastName}
              </h3>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-sm-end gap-3">
                <button
                  className="btn btn-warning mb-2 mb-sm-0"
                  onClick={() => navigate(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mb-2 mb-sm-0"
                  onClick={() => {}}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/users')}
                >
                  Back to Users
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger w-100 mt-3">{error}</div>}
    </div>
  )
}

export default UserCard
