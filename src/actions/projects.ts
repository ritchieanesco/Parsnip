import { normalize, schema, NormalizedSchema } from "normalizr";
import { ThunkAction } from "redux-thunk";
import * as api from "../api";
import { RootState } from "../reducers";
import { Tasks } from "../reducers/tasks";
import {
  FETCH_PROJECTS_STARTED,
  FETCH_PROJECTS_FAILED,
  FETCH_PROJECTS_SUCCEEDED,
  RECEIVE_ENTITIES,
  FetchProjectsFailed,
  FetchProjectsStarted,
  FetchProjectsSucceeded,
  ReceiveEntities,
  Projects,
  Entities,
} from "../reducers/projects";
import { SetCurrentProjectId } from "../reducers/page";
import * as pageActions from "./page";

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", {
  tasks: [taskSchema],
});

export const receiveEntities = (entities: Entities): ReceiveEntities => ({
  type: RECEIVE_ENTITIES,
  payload: {
    entities,
  },
});

export const fetchProjectsStarted = (): FetchProjectsStarted => ({
  type: FETCH_PROJECTS_STARTED,
});

export const fetchProjectsSucceeded = (
  projects: Projects
): FetchProjectsSucceeded => ({
  type: FETCH_PROJECTS_SUCCEEDED,
  payload: {
    projects,
  },
});

export const fetchProjectsFailed = (error: string): FetchProjectsFailed => ({
  type: FETCH_PROJECTS_FAILED,
  payload: {
    error,
  },
});

type FetchProjects = ThunkAction<
  Promise<void>,
  RootState,
  void,
  | FetchProjectsFailed
  | ReceiveEntities
  | SetCurrentProjectId
  | FetchProjectsStarted
>;

export const fetchProjects = (): FetchProjects => async (
  dispatch,
  getState
) => {
  dispatch(fetchProjectsStarted());
  try {
    const resp = await api.fetchProjects();
    const projects = resp.data;
    const normalizedData: NormalizedSchema<
      {
        projects: Projects;
        tasks: Tasks;
      },
      any
    > = normalize(projects, [projectSchema]);
    dispatch(receiveEntities(normalizedData.entities));
    if (!getState().page.currentProjectId) {
      const defaultProjectId = projects[0].id;
      dispatch(pageActions.setCurrentProjectId(defaultProjectId));
    }
  } catch (error) {
    dispatch(fetchProjectsFailed(error.message));
  }
};
