import { useState } from "react";
import Modal from "../common/Modal";

const ConfirmDeleteModal = ({ product, onConfirm, onCancel }) => {
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setError(null);
    setDeleting(true);
    try {
      await onConfirm();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal title="Delete product" onClose={onCancel}>
      <p className="admin-confirm-text">
        Delete <strong>{product.title}</strong>? The product will also be
        removed from all customers' carts. This cannot be undone.
      </p>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form-actions">
        <button
          className="admin-btn admin-btn-secondary"
          onClick={onCancel}
          disabled={deleting}
        >
          Cancel
        </button>
        <button
          className="admin-btn admin-btn-danger"
          onClick={handleConfirm}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;