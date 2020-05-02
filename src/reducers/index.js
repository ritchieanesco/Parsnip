import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";
import page, * as fromPage from "./page";
import projects, * as fromProjects from "./projects";
import tasks, * as fromTasks from "./tasks";

const rootReducer = combineReducers({
  page,
  projects,
  tasks,
});

export default rootReducer;

/** Page selectors */

export const getCurrentProjectId = (state) =>
  fromPage.getCurrentProjectId(state.page);

export const getSearchTerm = (state) => fromPage.getSearchTerm(state.page);

/** Project selectors */

export const getProjects = createSelector(
  [(state) => state.projects],
  (projects) => Object.keys(projects.items).map((id) => projects.items[id])
);

export const getIsLoading = (state) =>
  fromProjects.getIsLoading(state.projects);

export const getError = (state) => fromProjects.getError(state.projects);

/** Tasks selectors */

export const getTasks = (state) => fromTasks.getTasks(state.tasks);

export const getTasksByProjectId = (state) => {
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
    const grouped = {};
    TASK_STATUSES.forEach((status) => {
      grouped[status] = tasks.filter((task) => task.status === status);
    });
    return grouped;
  }
);
