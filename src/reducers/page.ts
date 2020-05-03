import { Action, Reducer } from "redux";

export const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";
export const FILTER_TASKS = "FILTER_TASKS";

export interface PageState {
  currentProjectId: null | number;
  searchTerm: string;
}

export interface SetCurrentProjectId
  extends Action<typeof SET_CURRENT_PROJECT_ID> {
  payload: {
    id: number;
  };
}

export interface SetFilterTasks extends Action<typeof FILTER_TASKS> {
  payload: {
    searchTerm: string;
  };
}

export type PageActions = SetCurrentProjectId | SetFilterTasks;

const initialState: PageState = {
  currentProjectId: null,
  searchTerm: "",
};

export const page: Reducer<PageState, PageActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT_ID:
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    case FILTER_TASKS:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    default:
      return state;
  }
};

export default page;

export const getCurrentProjectId = (state: PageState) => state.currentProjectId;
export const getSearchTerm = (state: PageState) => state.searchTerm;
