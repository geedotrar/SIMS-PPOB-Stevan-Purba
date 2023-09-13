export const setBannerData = (data) => ({
  type: "SET_BANNER_DATA",
  payload: data,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});
