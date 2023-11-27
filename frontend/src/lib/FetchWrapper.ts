import axios, { AxiosError, AxiosResponse } from "axios";
import { alertService } from "services/alertService";

const csrftoken = getCookie("csrftoken");
const token = localStorage.getItem("token");

function getCookie(name: string): string | null {
  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

function get<T>(url: string, params?: string): Promise<T> {
  return axios.get(params ? `${url}/${params}/` : `${url}/`)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => Promise.reject(error));
}

function post<T>(url: string, body: any): Promise<T> {
  return axios.post(`${url}/`, body, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => Promise.reject(error));
}

function setLanguage<T>(url: string, body: any): Promise<T> {
  return axios.post(`${url}`, body, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrftoken,
    },
    // mode: "same-origin",
  })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => Promise.reject(error));
}

function put<T>(url: string, body: any, id: string): Promise<T> {
  return axios.put(`${url}/${id}/`, body, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) => Promise.reject(error));
}

function _delete<T>(url: string, id: string): Promise<void> {
  const headers = { headers: { Authorization: `Token ${token}` } };

  return axios.delete(`${url}/${id}/`, headers)
    .then(() => {
      alertService.error("Deleted Successfully", {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    })
    .catch((error: AxiosError) => Promise.reject(error));
}

export const fetchWrapper = {
  get,
  post,
  put,
  setLanguage,
  delete: _delete,
};
