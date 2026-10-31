const AdminProductTable = ({ products, loading, error, onEdit, onDelete }) => {
  if (error) {
    return <div className="catalog-status catalog-status-error">{error}</div>;
  }

  if (loading && products.length === 0) {
    return <div className="catalog-status">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  return (
    <div className={`admin-table-wrapper ${loading ? "is-loading" : ""}`}>
      <table className="admin-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  className="admin-thumb"
                  src={product.images?.[0]}
                  alt={product.title}
                />
              </td>
              <td className="admin-cell-title">{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.rating}</td>
              <td className={product.stockQuantity === 0 ? "admin-out" : ""}>
                {product.stockQuantity}
              </td>
              <td>
                <div className="admin-row-actions">
                  <button className="admin-row-btn" onClick={() => onEdit(product)}>
                    Edit
                  </button>
                  <button
                    className="admin-row-btn danger"
                    onClick={() => onDelete(product)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductTable;