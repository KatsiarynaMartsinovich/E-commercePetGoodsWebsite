const getVisiblePages = (current, total) => {
  const unique = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...unique]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("...");
    result.push(p);
  });
  return result;
};

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Prev
      </button>

      {getVisiblePages(page, totalPages).map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`} className="pagination-dots">
            …
          </span>
        ) : (
          <button
            key={item}
            className={`pagination-btn ${item === page ? "active" : ""}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        className="pagination-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  );
};

export default Pagination;