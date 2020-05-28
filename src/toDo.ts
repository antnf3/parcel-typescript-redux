import "babel-polyfill";
import { createStore } from "redux";

const inputBox = <HTMLInputElement>document.getElementById("inputBox");
const btnAdd = <HTMLButtonElement>document.getElementById("btnAdd");

const ADD = "ADD";
const DEL = "DEL";
const COMPLETE = "COMPLETE";
const QUERY = "QUERY";
const TODOSDB = "toDosDB";

interface todoProps {
  toDo: string;
  id: number;
  complete: boolean;
}

const getLocalStorge = (): todoProps[] => {
  const locStg = JSON.parse(window.localStorage.getItem(TODOSDB));
  return locStg || [];
};

const handleLocatStorge = (obj: todoProps[]) => {
  window.localStorage.setItem(TODOSDB, JSON.stringify(obj));
  return obj;
};

// 3. create action
const addAction = (toDo: string) => {
  return <const>{
    type: ADD,
    payload: toDo,
  };
};

const delAction = (id: number) => {
  return <const>{
    type: DEL,
    payload: id,
  };
};
const completeAction = (id: number) => {
  return <const>{
    type: COMPLETE,
    payload: id,
  };
};

const queryAction = () => {
  return <const>{
    type: QUERY,
  };
};
const initalState = getLocalStorge();

type actionType =
  | ReturnType<typeof addAction>
  | ReturnType<typeof delAction>
  | ReturnType<typeof completeAction>
  | ReturnType<typeof queryAction>;

// 2. create reducer
const reducer = (state = initalState, action: actionType) => {
  switch (action.type) {
    case ADD:
      return handleLocatStorge([
        { toDo: action.payload, id: Date.now(), complete: false },
        ...state,
      ]);
    case DEL:
      return handleLocatStorge(
        state.filter((toDo) => toDo.id !== action.payload)
      );
    case COMPLETE:
      return handleLocatStorge(
        state.map(
          (toDo) =>
            (toDo.id === action.payload && {
              ...toDo,
              complete: !toDo.complete,
            }) ||
            toDo
        )
      );
    default:
      return state;
  }
};

// 1. createStore
const store = createStore(reducer);

const onChange = () => {
  paintList();
};

// 4. create subscribe
store.subscribe(onChange);

// handle dispatch
const handleDispatch = (fnc: actionType) => store.dispatch(fnc);

// Add
const handleBtnAdd = () => {
  const toDo = inputBox.value;
  if (toDo !== "") {
    handleDispatch(addAction(toDo));
  }
  inputBox.value = "";
  inputBox.focus();
};

// Complete
const handleBtnComplete = (ev: MouseEvent) => {
  const btn = <HTMLLIElement>ev.target;
  const id = parseInt(btn.parentElement.id, 10);
  handleDispatch(completeAction(id));
};

// Del
const handleBtnDel = (ev: MouseEvent) => {
  const btn = <HTMLLIElement>ev.target;
  const id = parseInt(btn.parentElement.id, 10);
  handleDispatch(delAction(id));
};

// Enter
const handleKeyPess = (ev: KeyboardEvent) => {
  const keyCode = ev.keyCode;
  keyCode === 13 && handleBtnAdd();
};

// Paint
const paintList = () => {
  const ul = <HTMLUListElement>document.querySelector("ul");
  ul.innerHTML = "";
  const arrToDoList = store.getState();
  const fragLi = document.createDocumentFragment();

  arrToDoList.forEach((toDos) => {
    const li = document.createElement("li");
    li.innerText = toDos.toDo;
    li.id = `${toDos.id}`;
    toDos.complete && li.classList.add("todo-complete");

    const btnDel = document.createElement("button");
    btnDel.innerText = "❌";
    btnDel.classList.add("del-button");
    btnDel.addEventListener("click", handleBtnDel);

    const btnComplete = document.createElement("button");
    !toDos.complete && (btnComplete.innerText = "✔");
    toDos.complete && (btnComplete.innerText = "➖");

    btnComplete.classList.add("compolete-button");
    btnComplete.addEventListener("click", handleBtnComplete);

    li.appendChild(btnComplete);
    li.appendChild(btnDel);
    fragLi.appendChild(li);
  });
  ul.appendChild(fragLi);
};

// Init Query
handleDispatch(queryAction());

// Event
btnAdd.addEventListener("click", handleBtnAdd);
inputBox.addEventListener("keypress", handleKeyPess);
