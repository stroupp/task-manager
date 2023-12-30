// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default api;

// Add this line at the bottom of your api.ts file
export {};
