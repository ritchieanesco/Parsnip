export const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";
export const FILTER_TASKS = "FILTER_TASKS";

const initialState = {
  currentProjectId: null,
  searchTerm: "",
};

export const page = (state = initialState, action) => {
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

export const getCurrentProjectId = (state) => state.currentProjectId;
export const getSearchTerm = (state) => state.searchTerm;
