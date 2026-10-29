import { useState } from "react";
import {
  buildFormData,
  buildJsonPayload,
  parseImageUrls,
  productToForm,
  validateImages,
} from "../../utils/productForm";
import {
  MAX_FILE_SIZE_MB,
  MAX_UPLOAD_FILES,
  MIN_IMAGES,
} from "../../constants/admin";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const isEdit = Boolean(product);

  const [form, setForm] = useState(() => productToForm(product));
  const [imageMode, setImageMode] = useState("urls");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const imagesError = validateImages(imageMode, form.imageUrls, files);
    if (imagesError) {
      setError(imagesError);
      return;
    }

    const payload =
      imageMode === "files"
        ? buildFormData(form, files)
        : buildJsonPayload(form);

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label className="admin-field">
        <span>Title</span>
        <input
          name="title"
          required
          maxLength={255}
          value={form.title}
          onChange={handleChange}
        />
      </label>

      <label className="admin-field">
        <span>Description</span>
        <textarea
          name="description"
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>Price ($)</span>
          <input
            name="price"
            type="number"
            required
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label className="admin-field">
          <span>Rating (0–5)</span>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
          />
        </label>

        <label className="admin-field">
          <span>Stock</span>
          <input
            name="stockQuantity"
            type="number"
            required
            min="0"
            step="1"
            value={form.stockQuantity}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="admin-field">
        <span>Images (minimum {MIN_IMAGES})</span>

        {!isEdit && (
          <div className="admin-mode-switch">
            <label>
              <input
                type="radio"
                name="imageMode"
                checked={imageMode === "urls"}
                onChange={() => setImageMode("urls")}
              />
              Image URLs
            </label>
            <label>
              <input
                type="radio"
                name="imageMode"
                checked={imageMode === "files"}
                onChange={() => setImageMode("files")}
              />
              Upload files
            </label>
          </div>
        )}

        {imageMode === "urls" ? (
          <>
            <textarea
              name="imageUrls"
              rows={4}
              placeholder={"https://example.com/1.jpg\nhttps://example.com/2.jpg\nhttps://example.com/3.jpg"}
              value={form.imageUrls}
              onChange={handleChange}
            />
            <small className="admin-hint">
              One URL per line. Now: {parseImageUrls(form.imageUrls).length}
            </small>
          </>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            <small className="admin-hint">
              Up to {MAX_UPLOAD_FILES} files, {MAX_FILE_SIZE_MB} MB each. They are
              uploaded to Supabase Storage.
            </small>
            {files.length > 0 && (
              <ul className="admin-file-list">
                {files.map((file) => (
                  <li key={file.name + file.size}>
                    {file.name} ({(file.size / 1024).toFixed(0)} KB)
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          disabled={submitting}
        >
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;