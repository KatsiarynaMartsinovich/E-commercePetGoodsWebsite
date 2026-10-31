import { useEffect, useMemo, useState } from "react";
import { productsApi } from "../api/productsApi";
import { useDebounce } from "./useDebounce";
import {
  DEFAULT_LIMIT,
  INITIAL_FILTERS,
  SORT_OPTIONS,
} from "../constants/catalog";

export const useProducts = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].label);
  const [page, setPage] = useState(1);

  const [data, setData] = useState({ items: [], meta: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedFilters = useDebounce(filters);
  const debouncedSearch = useDebounce(search);

  const query = useMemo(() => {
    const { sortBy, order } = SORT_OPTIONS.find(
      (option) => option.label === sortOption
    );

    return {
      page,
      limit: DEFAULT_LIMIT,
      search: debouncedSearch.trim(),
      min_price: debouncedFilters.minPrice,
      max_price: debouncedFilters.maxPrice,
      min_rating: debouncedFilters.minRating,
      sort_by: sortBy,
      order,
    };
  }, [page, debouncedSearch, debouncedFilters, sortOption]);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    productsApi
      .list(query)
      .then((response) => {
        if (!ignore) setData(response);
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
  }, [query]);

  const updateFilters = (updater) => {
    setFilters(updater);
    setPage(1);
  };

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const updateSort = (value) => {
    setSortOption(value);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  return {
    products: data.items,
    meta: data.meta,
    loading,
    error,
    filters,
    setFilters: updateFilters,
    resetFilters,
    search,
    setSearch: updateSearch,
    sortOption,
    setSortOption: updateSort,
    page,
    setPage,
  };
};