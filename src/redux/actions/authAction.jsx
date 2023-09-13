export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token,
});

export const setLogout = () => ({
  type: "SET_LOGOUT",
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});
