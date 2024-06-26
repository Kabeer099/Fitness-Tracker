import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/", // Corrected baseURL
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  

export const addNutrition = async (token, data) => {
    try {
      const response = await API.post('/user/nutrition', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
export const recordProgress = async (token, data) => {
    try {
      const response = await API.post('/user/progress', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };