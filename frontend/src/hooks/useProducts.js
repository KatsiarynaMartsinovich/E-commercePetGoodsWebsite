import { useState, useMemo } from "react";
import productsData from "../data/products.json";
import { filterProducts, sortProducts } from "../utils/productUtils";

export const useProducts = () => {
  const [filters, setFilters] = useState({
    ratings: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [sortOption, setSortOption] = useState("Name (A-Z)");

  // 👉 сначала фильтруем
  const filteredProducts = useMemo(() => {
    return filterProducts(productsData, filters);
  }, [filters]);

  // 👉 потом сортируем ВСЕГДА
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  return {
    products: sortedProducts,
    filters,
    setFilters,
    sortOption,
    setSortOption,
  };
};