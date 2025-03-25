import { useEffect, useState } from 'react'
import { fetchUsers } from '../api/api'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetchUsers()
        setUsers(response)
        setFilteredUsers(response)
      } catch (error) {
        setError(error.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  return (
    <div className="container d-flex flex-column h-100 mt-3 align-items-center">
      {/* Заголовок */}
      <h3 className="mt-2 mb-4 text-center">All users</h3>

      {/* Пошук + створення */}
      <div className="row justify-content-between align-items-center w-100 mb-3">
        <div className="col-8 col-sm-8 col-md-9 ps-0">
          <input
            type="text"
            className="form-control"
            value={search}
            onChange={handleSearch}
            placeholder="Search by username..."
          />
        </div>
        <div className="col-4 col-sm-4 col-md-3 text-end p-0">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/users/add')}
          >
            <span className="d-none d-sm-inline">Create new user</span>
            <span className="d-inline d-sm-none">New user</span>
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger w-100">{error}</div>}

      {/* Контейнер для списку користувачів */}
      <div className="d-flex flex-column flex-grow-1 w-100">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-start flex-grow-1"
            style={{ minHeight: 0 }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4 pb-5">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div className="col-12 col-sm-6 col-lg-4" key={user.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-primary text-white text-center">
                      <h5 className="mb-0">
                        {user.firstName} {user.lastName}
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li>
                          <strong className="me-1">Email:</strong>
                          <span className="text-break">{user.email}</span>
                        </li>
                        <li>
                          <strong className="me-1">Phone:</strong>
                          <span className="text-break">{user.phone}</span>
                        </li>
                        <li>
                          <strong className="me-1">Username:</strong>
                          <span className="text-break">{user.username}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer bg-white border-0 text-center">
                      <button
                        className="btn btn-outline-primary px-4"
                        onClick={() => navigate(`/users/${user.id}`)}
                      >
                        Details...
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <h5 className="text-center">No users found</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList
