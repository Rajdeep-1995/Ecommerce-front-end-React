import axios from "axios";

export const createProduct = async (authToken, product) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authToken,
    },
  });

export const updateProduct = async (authToken, product, slug) =>
  await axios.post(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authToken,
    },
  });
export const getAllProducts = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (authToken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authToken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
