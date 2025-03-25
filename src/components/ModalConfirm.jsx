import React from 'react'
import { createPortal } from 'react-dom'

const ModalConfirm = ({ modalTitle, onSubmit, onClose }) => {
  return createPortal(
    <div
      className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1050,
      }}
    >
      <div
        className="modal-container"
        style={{ maxWidth: '500px', width: '90%' }}
      >
        <div
          className="modal d-flex justify-content-center align-items-center"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onSubmit}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('root')
  )
}

export default ModalConfirm
