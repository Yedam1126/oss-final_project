import axios from "axios";

const MOCKAPI_URL = "https://6916afcca7a34288a27e0948.mockapi.io/favorites";

export async function getFavorites() {
  return axios.get(MOCKAPI_URL);
}

export async function addFavorite(data) {
  return axios.post(MOCKAPI_URL, data);
}

export async function deleteFavorite(id) {
  return axios.delete(`${MOCKAPI_URL}/${id}`);
}
export async function updateFavorite(id, data) {
  return axios.put(`${MOCKAPI_URL}/${id}`, data);
}
