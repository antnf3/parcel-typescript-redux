export const ADD = "ADD";
export const DELETE = "DELETE";

export interface ToDo {
  text: string;
  id: number;
}

export interface addActionInterface {
  type: typeof ADD;
  text: string;
}

export interface deleteActionInterface {
  type: typeof DELETE;
  id: number;
}

export type todoActionType = addActionInterface | deleteActionInterface;
