import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTasks = () => client.get("/tasks", { data: null });

export const fetchProjects = () =>
  client.get("/projects?_embed=tasks", { data: null });

export const createTask = (params) =>
  client.post("/tasks", { ...params, timer: 0 });

export const editTask = (id, params) => client.put(`/tasks/${id}`, params);

export const deleteTask = (id) => client.delete(`/tasks/${id}`, { data: null });
