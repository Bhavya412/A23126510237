export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
  } else {
    localStorage.removeItem("access_token");
  }
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!(token && token.trim());
};

export const saveCredentials = (creds) => {
  localStorage.setItem("registered_credentials", JSON.stringify(creds));
};

export const getCredentials = () => {
  const creds = localStorage.getItem("registered_credentials");
  try {
    return creds ? JSON.parse(creds) : null;
  } catch {
    return null;
  }
};