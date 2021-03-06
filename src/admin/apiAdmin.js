import {API} from '../config';

export const addCategory = (userId, token, category) => {
  return fetch (`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify (category),
  })
    .then (response => {
      return response.json ();
    })
    .catch (error => {
      console.log (error);
    });
};

export const addProduct = (userId, token, product) => {
  return fetch (`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then (response => {
      return response.json ();
    })
    .catch (error => {
      console.log (error);
    });
};

export const getCategories = () => {
  return fetch (`${API}/categories`, {
    method: 'GET',
  })
    .then (response => {
      return response.json ();
    })
    .catch (error => {
      console.log (error);
    });
};
