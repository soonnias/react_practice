import { useEffect, useState } from 'react'
import { fetchUsers, searchUsers } from '../api/api'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'

const UserList = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchMessage, setSearchMessage] = useState('')
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

  const handleSearch = async () => {
    if (!search.trim()) {
      setSearchMessage('')
      setFilteredUsers(users)
      return
    }

    try {
      setLoading(true)
      const searchResults = await searchUsers(search)
      setFilteredUsers(searchResults)
      setSearchMessage(`Search by "${search}"`)
    } catch (error) {
      setError('Failed to search users')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearch('')
    setSearchMessage('')
    setFilteredUsers(users)
  }

  return (
    <div className="container d-flex flex-column h-100 mt-3 align-items-center">
      <h3 className="mt-2 mb-4 text-center">All users</h3>

      {/* Пошук */}
      <div className="row justify-content-center w-100 mb-3 text-center">
        <div className="col-12 col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="col-12 col-md-3 mb-2 d-grid">
          <button
            className="btn btn-outline-primary w-100"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="col-12 col-md-3 mb-2 d-grid">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {searchMessage && (
        <div className="alert alert-info w-100 text-center">
          {searchMessage}
        </div>
      )}

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
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <div className="col-12">
                <h5 className="text-center">No users found</h5>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        className="btn btn-secondary btn-lg rounded-circle position-fixed bottom-3 end-3 shadow-lg"
        style={{
          width: '50px',
          height: '50px',
          right: '10px',
          bottom: '10px',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}
        onClick={() => navigate('/user/add')}
      >
        +
      </button>
    </div>
  )
}

export default UserList
