import { createStore } from "redux";
import {
  ADD,
  DELETE,
  todoActionType,
  addActionInterface,
  deleteActionInterface,
  ToDo
} from "./types";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const addAction = (text: string): addActionInterface => {
  return {
    type: ADD,
    text
  };
};

const deleteAction = (id: number): deleteActionInterface => {
  return {
    type: DELETE,
    id
  };
};

const initialStateType: ToDo[] = [];

const reducer = (state = initialStateType, action: todoActionType) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return [...state.filter(todo => todo.id !== action.id)];
    default:
      return state;
  }
};

const store = createStore(reducer);

const deleteTodo = (e: any) => {
  const id = parseInt(e.currentTarget.parentElement.id, 10);
  store.dispatch(deleteAction(id));
};

const updateText = () => {
  ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach(todo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.innerText = todo.text;
    li.id = todo.id.toString();
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteTodo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(updateText);

const onSubmit = (e: any) => {
  e.preventDefault();
  const text = input.value;
  store.dispatch(addAction(text));
  input.value = "";
};

form.addEventListener("submit", onSubmit);
