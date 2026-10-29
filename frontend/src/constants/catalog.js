export const DEFAULT_LIMIT = 12;

export const SORT_OPTIONS = [
  { label: "Name (A-Z)", sortBy: "title", order: "asc" },
  { label: "Name (Z-A)", sortBy: "title", order: "desc" },
  { label: "Price (Low to High)", sortBy: "price", order: "asc" },
  { label: "Price (High to Low)", sortBy: "price", order: "desc" },
];

export const RATING_OPTIONS = [
  { label: "4.5+ Stars", value: 4.5 },
  { label: "4+ Stars", value: 4 },
  { label: "3+ Stars", value: 3 },
];

export const INITIAL_FILTERS = {
  minRating: null,
  minPrice: "",
  maxPrice: "",
};