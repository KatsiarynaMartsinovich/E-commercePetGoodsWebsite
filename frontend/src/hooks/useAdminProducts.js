import { useEffect, useState } from "react";
import { productsApi } from "../api/productsApi";
import { useDebounce } from "./useDebounce";
import { ADMIN_PAGE_SIZE } from "../constants/admin";

export const useAdminProducts = () => {
  const [page, setPage] = useState(1);
  const [search, setSearchValue] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [data, setData] = useState({ items: [], meta: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    productsApi
      .list({
        page,
        limit: ADMIN_PAGE_SIZE,
        search: debouncedSearch.trim(),
        sort_by: "title",
        order: "asc",
      })
      .then((response) => {
        if (ignore) return;
        if (response.items.length === 0 && page > 1) {
          setPage((prev) => prev - 1);
          return;
        }
        setData(response);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page, debouncedSearch, reloadKey]);

  const setSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const reload = () => setReloadKey((prev) => prev + 1);

  return {
    products: data.items,
    meta: data.meta,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    reload,
  };
};