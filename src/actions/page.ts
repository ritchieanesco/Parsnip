import {
  FILTER_TASKS,
  SET_CURRENT_PROJECT_ID,
  SetCurrentProjectId,
  SetFilterTasks,
} from "../reducers/page";

export const filterTasks = (searchTerm: string): SetFilterTasks => ({
  type: FILTER_TASKS,
  payload: {
    searchTerm,
  },
});

export const setCurrentProjectId = (id: number): SetCurrentProjectId => ({
  type: SET_CURRENT_PROJECT_ID,
  payload: {
    id,
  },
});
