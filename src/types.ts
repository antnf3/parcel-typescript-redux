export const ADD = "ADD";
export const DELETE = "DELETE";

export interface stateProps {
  text: string;
  id: number;
}

export interface addActionProps {
  type: typeof ADD;
  text: string;
}

export interface deleteActionProps {
  type: typeof DELETE;
  id: number;
}

export type actionTypes = addActionProps | deleteActionProps;
