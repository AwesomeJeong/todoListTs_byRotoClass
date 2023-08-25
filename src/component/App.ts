import { fetchData } from "../util/api.js";
import { IAppState } from "../util/interface.js";

import TodoList from "./TodoList.js";

interface IThis {
  state: IAppState;
  setState(nextState: IAppState): void;
}

interface IProps {
  $target: Element;
  initialState: IAppState;
}

export default function App(this: IThis, { $target, initialState }: IProps) {
  this.state = initialState as IAppState;

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(nextState.todos);
  };

  const getData = async () => {
    const data = await fetchData.get();
    this.setState({ ...this.state, todos: data });
  };

  const todoList = new (TodoList as any)({
    $target,
    initialState: this.state.todos,
  });

  getData();
}
