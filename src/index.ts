import { App, AppState } from "./component/App.js";

async function Main() {
  const $target = document.querySelector("#App");
  const data: AppState = {
    todos: [],
  };
  console.log($target);
  new (App as any)({ $target, initialState: data });
}

new (Main as any)();
