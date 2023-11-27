const API_URL = process.env.REACT_APP_BASE_URL as string;
const baseUrl = `${API_URL}/rest-auth`;

export const authService = {
  login,
  logout,
  getUserToken,
};

function login(email: string, password: string) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${baseUrl}/login/`, requestOptions)
    .then(handleResponse)
    .then((user) => user);
}

function logout() {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };

  return fetch(`${baseUrl}/logout/`, requestOptions)
    .then((res) => res.json())
    .then(() => {
      localStorage.clear();
    });
}

function getUserToken(token: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(`${baseUrl}/user/`, requestOptions).then((res) => res);
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (data.errors) {
      return data.errors;
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 400) {
        logout();
      }

      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}
