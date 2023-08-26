import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

//Register user
const signup = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.post(API_URL + "register", userData, config);

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
  const response = await axios.post(API_URL + "auth", userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const signout = () => {
  localStorage.removeItem("user");
};

const userService = {
  signup,
  signin,
  signout,
};

export default userService;
