import axios from "axios";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  category: string;
};

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Replace with your actual API base URL
});

export const fetchTasks = async () => {
  const response = await api.get("/todos");
  return response.data as Task[];
};

export const addTask = async (
  title: string,
  priority: string,
  category: string
) => {
  const response = await api.post("/todos", {
    title,
    priority,
    category,
    completed: false,
  });
  return response.data as Task;
};

export const updateTask = async (id: number, taskData: Partial<Task>) => {
  const response = await api.put(`/todos/${id}`, taskData);
  return response.data as Task;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/todos/${id}`);
};
// Fetch all users (if needed for task assignment)
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};
