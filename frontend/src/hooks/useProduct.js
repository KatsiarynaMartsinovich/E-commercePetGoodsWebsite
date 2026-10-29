import { useEffect, useState } from "react";
import { productsApi } from "../api/productsApi";

const INITIAL_STATE = {
  product: null,
  loading: true,
  notFound: false,
  error: null,
};

export const useProduct = (id) => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let ignore = false;

    setState(INITIAL_STATE);

    productsApi
      .getById(id)
      .then((product) => {
        if (!ignore) {
          setState({ ...INITIAL_STATE, product, loading: false });
        }
      })
      .catch((err) => {
        if (ignore) return;
        const notFound = err.status === 404 || err.status === 400;
        setState({
          ...INITIAL_STATE,
          loading: false,
          notFound,
          error: notFound ? null : err.message,
        });
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return state;
};