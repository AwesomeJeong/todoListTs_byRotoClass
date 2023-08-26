import App from "./component/App.js";
import { IAppState } from "./util/interface.js";

async function Main() {
  const $target = document.querySelector("#App");
  const data: IAppState = {
    todos: [],
    loading: false,
    users: [],
    selectedUser: "wonjun",
  };
  new (App as any)({ $target, initialState: data });
}

new (Main as any)();
