import { useNavigate } from 'react-router-dom'

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  return (
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
            onClick={() => navigate(`/user/${user.id}`)}
          >
            Details...
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
