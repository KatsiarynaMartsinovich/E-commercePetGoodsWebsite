import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchBar from "../components/ProductCatalog/SearchBar";
import Pagination from "../components/ProductCatalog/Pagination";
import AdminProductTable from "../components/Admin/AdminProductTable";
import ConfirmDeleteModal from "../components/Admin/ConfirmDeleteModal";
import ProductForm from "../components/Admin/ProductForm";
import Modal from "../components/common/Modal";
import { productsApi } from "../api/productsApi";
import { useToast } from "../context/ToastContext";
import { useAdminProducts } from "../hooks/useAdminProducts";

const Admin = () => {
  const { showToast } = useToast();
  const {
    products,
    meta,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    reload,
  } = useAdminProducts();

  const [formState, setFormState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const closeForm = () => setFormState(null);
  const closeDelete = () => setDeleteTarget(null);

  const handleSave = async (payload) => {
    if (formState.product) {
      await productsApi.update(formState.product.id, payload);
      showToast("Product updated");
    } else {
      const created = await productsApi.create(payload);
      showToast("Product created");
      setSearch(created.title);
    }

    closeForm();
    reload();
  };

  const handleDelete = async () => {
    await productsApi.remove(deleteTarget.id);
    showToast(`${deleteTarget.title} deleted`);
    closeDelete();
    reload();
  };

  return (
    <>
      <Header />

      <main className="admin-page">
        <div className="admin-container">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Product management</h1>
              <p className="admin-subtitle">
                {meta?.total_items ?? 0} products in the catalog
              </p>
            </div>

            <button
              className="admin-btn admin-btn-primary"
              onClick={() => setFormState({ product: null })}
            >
              + Add product
            </button>
          </div>

          <SearchBar value={search} onChange={setSearch} />

          <AdminProductTable
            products={products}
            loading={loading}
            error={error}
            onEdit={(product) => setFormState({ product })}
            onDelete={setDeleteTarget}
          />

          <Pagination
            page={page}
            totalPages={meta?.total_pages ?? 0}
            onPageChange={setPage}
          />
        </div>
      </main>

      {formState && (
        <Modal
          title={formState.product ? "Edit product" : "Add product"}
          onClose={closeForm}
        >
          <ProductForm
            product={formState.product}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={closeDelete}
        />
      )}

      <Footer />
    </>
  );
};

export default Admin;