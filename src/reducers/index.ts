import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";
import page, * as fromPage from "./page";
import projects, * as fromProjects from "./projects";
import tasks, * as fromTasks from "./tasks";
import Task from "../components/Task";

export interface RootState {
  page: fromPage.PageState;
  projects: fromProjects.ProjectsState;
  tasks: fromTasks.TaskState;
}

const rootReducer = combineReducers<RootState>({
  page,
  projects,
  tasks,
});

export default rootReducer;

/** Page selectors */

export const getCurrentProjectId = (state: RootState) =>
  fromPage.getCurrentProjectId(state.page);

export const getSearchTerm = (state: RootState) =>
  fromPage.getSearchTerm(state.page);

/** Project selectors */

export const getProjects = createSelector(
  [(state: RootState) => state.projects],
  (projects) => Object.keys(projects.items).map((id) => projects.items[id])
);

export const getIsLoading = (state: RootState) =>
  fromProjects.getIsLoading(state.projects);

export const getError = (state: RootState) =>
  fromProjects.getError(state.projects);

/** Tasks selectors */

export const getTasks = (state: RootState) => fromTasks.getTasks(state.tasks);

export const getTasksByProjectId = (state: RootState) => {
  const { currentProjectId } = state.page;
  if (!currentProjectId || !state.projects.items[currentProjectId]) {
    return [];
  }
  const taskIds = state.projects.items[currentProjectId].tasks;
  return taskIds.map((id) => state.tasks.items[id]);
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) =>
    tasks.filter((task) => task.title.match(new RegExp(searchTerm, "i")))
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    let grouped: { [key: string]: fromTasks.Task[] } = {};
    TASK_STATUSES.forEach((status) => {
      grouped[status] = tasks.filter((task) => task.status === status);
    });
    return grouped;
  }
);
