export const filterProducts = (products, filters) => {
  let result = [...products];

  // Фильтр по рейтингу
  if (filters.ratings.length > 0) {
    result = result.filter((product) => {
      return filters.ratings.some((ratingLabel) => {
        const ratingValue = parseInt(ratingLabel);
        return product.rating >= ratingValue;
      });
    });
  }

  // Фильтр по цене
  result = result.filter((product) => {
    const price = product.price;
    return (
      price >= filters.minPrice &&
      price <= filters.maxPrice
    );
  });

  return result;
};

export const sortProducts = (products, sortOption) => {
  const sorted = [...products];

  switch (sortOption) {
    case "Name (A-Z)":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "Name (Z-A)":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "Price (Low to High)":
      return sorted.sort((a, b) => a.price - b.price);

    case "Price (High to Low)":
      return sorted.sort((a, b) => b.price - a.price);

    default:
      return sorted;
  }
};