import { Action, Reducer } from "redux";
import { RECEIVE_ENTITIES, ReceiveEntities } from "./projects";

export const CREATE_TASK_SUCCEEDED = "CREATE_TASK_SUCCEEDED";
export const EDIT_TASK_SUCCEEDED = "EDIT_TASK_SUCCEEDED";
export const DELETE_TASK_SUCCEEDED = "DELETE_TASK_SUCCEEDED";
export const TIMER_INCREMENT = "TIMER_INCREMENT";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface Task {
  id: number;
  description: string;
  projectId: number;
  status: string;
  timer: number;
  title: string;
}

export type InitialTask = WithOptional<Omit<Task, "id" | "timer">, "status">;

export interface Tasks {
  [index: string]: Task;
}

export interface TaskState {
  items: Tasks;
  isLoading: boolean;
}

export interface CreateTaskSucceeded
  extends Action<typeof CREATE_TASK_SUCCEEDED> {
  payload: {
    task: Task;
  };
}

export interface EditTaskSucceeded extends Action<typeof EDIT_TASK_SUCCEEDED> {
  payload: {
    task: Task;
  };
}

export interface DeleteTaskSucceeded
  extends Action<typeof DELETE_TASK_SUCCEEDED> {
  payload: {
    task: Task;
  };
}

export interface TimerIncrement extends Action<typeof TIMER_INCREMENT> {
  payload: {
    taskId: number;
  };
}

export type TaskActions =
  | ReceiveEntities
  | CreateTaskSucceeded
  | EditTaskSucceeded
  | DeleteTaskSucceeded
  | TimerIncrement;

const initialState: TaskState = { items: {}, isLoading: false };

const tasks: Reducer<TaskState, TaskActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case RECEIVE_ENTITIES: {
      const { entities } = action.payload;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks,
        };
      }
      return state;
    }
    case CREATE_TASK_SUCCEEDED:
    case EDIT_TASK_SUCCEEDED: {
      const { task } = action.payload;

      const nextTasks = {
        ...state.items,
        [task.id]: task,
      };

      return {
        ...state,
        items: nextTasks,
      };
    }
    case DELETE_TASK_SUCCEEDED:
      const { task } = action.payload;
      const { [task.id]: _, ...items } = state.items;
      return {
        ...state,
        items,
      };
    case TIMER_INCREMENT: {
      const nextTasks = Object.keys(state.items).map((taskId) => {
        const task = state.items[taskId];
        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    default:
      return state;
  }
};

export default tasks;

export const getTasks = (state: TaskState) => state.items;
