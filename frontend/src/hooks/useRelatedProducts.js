import { useEffect, useState } from "react";
import { productsApi } from "../api/productsApi";

const RELATED_COUNT = 3;

export const useRelatedProducts = (product) => {
  const [related, setRelated] = useState([]);
  const productId = product?.id;
  const productPrice = product?.price;

  useEffect(() => {
    if (!productId) return;

    let ignore = false;

    productsApi
      .list({
        limit: RELATED_COUNT + 1,
        min_price: Math.floor(productPrice * 0.5),
        max_price: Math.ceil(productPrice * 1.5),
        sort_by: "price",
        order: "asc",
      })
      .then(({ items }) => {
        if (ignore) return;
        setRelated(
          items.filter((item) => item.id !== productId).slice(0, RELATED_COUNT)
        );
      })
      .catch(() => {
        if (!ignore) setRelated([]);
      });

    return () => {
      ignore = true;
    };
  }, [productId, productPrice]);

  return related;
};