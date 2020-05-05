import axios from "axios";
import { Task } from "../reducers/tasks";

const API_BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Fetches an object containing an array of Project and Tasks */

export const fetchProjects = () =>
  client.get("/projects?_embed=tasks", { data: null });

/** Creates a new task */

export const createTask = (params: Omit<Task, "id" | "timer">) =>
  client.post("/tasks", { ...params, timer: 0 });

/** Edits task with given id and the updated values */

export const editTask = (id: number, params: Task) =>
  client.put(`/tasks/${id}`, params);

/** Delets task with given id */

export const deleteTask = (id: number) =>
  client.delete(`/tasks/${id}`, { data: null });
