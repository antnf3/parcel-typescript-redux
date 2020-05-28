import "babel-polyfill";
import { createStore } from "redux";

const add = document.querySelector("#add");
const minus = document.querySelector("#minus");
const number = document.querySelector("span");

let num = 0;
number.innerText = `${num}`;

const ADD = "ADD";
const MINUS = "MINUS";

// 1. 기존방식
// interface ActionAdd {
//   type: typeof ADD;
//   payload: number;
// }
// interface ActionMinus {
//   type: typeof MINUS;
//   payload: number;
// }

// const addAction = (num: number): ActionAdd => {
//   return { type: ADD, payload: num };
// };
// const minusAction = (num: number): ActionMinus => {
//   return { type: MINUS, payload: num };
// };

// type Actions = ActionAdd | ActionMinus;

// 2. const assertion, ReturnType을 사용하여 중복제거
// *** const assertion - type 속성을 타입추론 시 활용할 수 있게 하기 위함
const addAction = (num: number) => {
  return <const>{ type: ADD, payload: num };
};
const minusAction = (num: number) => {
  return <const>{ type: MINUS, payload: num };
};

//interface 대신 ReturnType을 활용해 중복 제거
type Actions = ReturnType<typeof addAction> | ReturnType<typeof minusAction>;

const reducer = (state = 0, action: Actions) => {
  switch (action.type) {
    case ADD:
      return state + action.payload;
    case MINUS:
      return state - action.payload;
    default:
      return state;
  }
};

const store = createStore(reducer);

const onChange = () => {
  number.innerText = `${store.getState()}`;
};

store.subscribe(onChange);

const handleDispatch = (acs: Actions) => {
  store.dispatch(acs);
};

const handleAdd = () => {
  handleDispatch(addAction(2));
};

const handleMinus = () => {
  handleDispatch(minusAction(1));
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
