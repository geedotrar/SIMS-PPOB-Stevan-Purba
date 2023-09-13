import axios from "./apiConfig";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/login", {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Login failed. Please check your credentials.");
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password, firstName, lastName) => {
  try {
    const response = await axios.post("/registration", {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Registration failed. Please check your input.");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchBannerData = async (token) => {
  try {
    const response = await axios.get("/banner", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch banner data");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchServicesData = async (token) => {
  try {
    const response = await axios.get("/services", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch services");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchProfileData = async (token) => {
  try {
    const response = await axios.get("/profile", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch profile");
    }
  } catch (error) {
    throw error;
  }
};

export const updateProfileData = async (token, firstName, lastName) => {
  try {
    const response = await axios.put(
      "/profile/update",
      {
        first_name: firstName,
        last_name: lastName,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error("Failed to update profile:", response.statusText);
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export const fetchBalanceData = async (token) => {
  try {
    const response = await axios.get("/balance", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch balance");
    }
  } catch (error) {
    throw error;
  }
};

export const topUp = async (topUpAmount, token) => {
  try {
    const data = {
      top_up_amount: topUpAmount,
    };

    const response = await axios.post("/topup", data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Top Up Error");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchTransactionHistory = async (offset, limit, token) => {
  try {
    const response = await axios.get(`/transaction/history?offset=${offset}&limit=${limit}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data.records;
    } else {
      throw new Error("Failed to fetch transaction history");
    }
  } catch (error) {
    throw error;
  }
};

export const servicePayment = async (serviceCode, token) => {
  try {
    const data = {
      service_code: serviceCode,
    };
    const response = await axios.post("/transaction", data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Payment failed");
    }
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (token, file) => {
  try {
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(file.type)) {
      throw new Error("Invalid image format. Only JPEG and PNG are allowed.");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.put("/profile/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error("Failed to upload image:", response.statusText);
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};
