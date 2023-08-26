import axios from "axios";

const API_URL = "/api/user/";

//Register user
const signup = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.post(API_URL + "signup", userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const signin = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.post(API_URL + "signin", userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const signout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  signin,
  signout,
};

export default authService;
