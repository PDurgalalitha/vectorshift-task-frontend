import axios from "axios";

// Create an instance with custom configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function GET(route) {
  try {
    const response = await api.get(route);
    return response;
  } catch (error) {
    console.error("Error saving flow:", error);
    throw error;
  }
}

export async function POST(route, payload) {
  try {
    const response = await api.post(route, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving flow:", error);
    throw error;
  }
}
