import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;
number.innerText = count.toString();
// type CounterAction = | ReturnType<typeof >
const reducer = (state = 0, action: any) => {
  switch (action.type) {
    case "ADD":
      return state;
  }
};
const store = createStore(reducer);

const updateCount = () => {
  number.innerText = count.toString();
};

const handleAdd = () => {
  count = count + 1;
  updateCount();
};
const handleMinus = () => {
  count = count - 1;
  updateCount();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
