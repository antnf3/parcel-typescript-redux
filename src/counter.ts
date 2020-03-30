import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;
number.innerText = count.toString();

const ADD = "ADD";
const DELETE = "DELETE";

interface addActionInterface {
  type: typeof ADD;
}
interface deleteActionInterface {
  type: typeof DELETE;
}
type countActionType = addActionInterface | deleteActionInterface;

const reducer = (state = 0, action: countActionType) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    case DELETE:
      return state - 1;
    default:
      return state;
  }
};
const store = createStore(reducer);

const onChange = () => {
  const count = store.getState();
  number.innerText = count.toString();
};

store.subscribe(onChange);

const handleAdd = () => {
  store.dispatch({ type: ADD });
};
const handleMinus = () => {
  store.dispatch({ type: DELETE });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
