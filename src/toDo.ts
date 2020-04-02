import { createStore } from "redux";
import {
  ADD,
  DELETE,
  addActionProps,
  deleteActionProps,
  stateProps,
  actionTypes
} from "./types";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const addAction = (text: string): addActionProps => {
  return {
    type: ADD,
    text
  };
};

const deleteAction = (id: number): deleteActionProps => {
  return {
    type: DELETE,
    id
  };
};

const initialStateProps: stateProps[] = [];

const reducer = (state = initialStateProps, action: actionTypes) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const onChange = () => {
  console.log(store.getState());
};
store.subscribe(onChange);

const paintTodo = () => {
  ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.innerText = toDo.text;
    li.id = toDo.id.toString();
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintTodo);

const deleteToDo = (e: MouseEvent) => {
  const id = parseInt(
    (<HTMLButtonElement>e.currentTarget).parentElement.id,
    10
  );
  store.dispatch(deleteAction(id));
};

const addToDo = (e: Event) => {
  e.preventDefault();
  const text = input.value;
  store.dispatch(addAction(text));
  input.value = "";
  input.focus();
};

form.addEventListener("submit", addToDo);
