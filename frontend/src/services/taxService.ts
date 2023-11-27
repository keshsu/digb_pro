import { fetchWrapper } from "lib/FetchWrapper";

const API_URL = `${process.env.REACT_APP_BASE_URL}/api`;
const baseUrl = `${API_URL}/tax`;

export const taxService = {
  get,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function get(params: string) {
  return fetchWrapper.get<any>(`${baseUrl}/${params}`);
}

function getAll() {
  return fetchWrapper.get<any>(baseUrl);
}

function getById(id: string) {
  return fetchWrapper.get<any>(`${baseUrl}`, `${id}`);
}

function create(params: any) {
  return fetchWrapper.post<any>(baseUrl, params);
}

function update(id: string, params: any) {
  return fetchWrapper.put<any>(`${baseUrl}`, params, `${id}`);
}

// prefixed with underscored because delete is a reserved word in JavaScript
function _delete(id: string) {
  return fetchWrapper.delete<void>(`${baseUrl}`, `${id}`);
}
