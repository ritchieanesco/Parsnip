import axios from "axios";
import { Task } from "../reducers/tasks";

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

export const createTask = (params: Omit<Task, "id" | "timer">) =>
  client.post("/tasks", { ...params, timer: 0 });

export const editTask = (id: number, params: Task) =>
  client.put(`/tasks/${id}`, params);

export const deleteTask = (id: number) =>
  client.delete(`/tasks/${id}`, { data: null });
