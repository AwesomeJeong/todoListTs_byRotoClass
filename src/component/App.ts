import { fetchData } from "../util/api.js";
import { IAppState } from "../util/interface.js";

import TodoInput from "./TodoInput.js";
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

  const todoInput = new (TodoInput as any)({
    $target,
    onInput: async (text: string) => {
      try {
        if (text.trim() !== "") {
          await fetchData.post(text);
          getData();
        }
      } catch (e) {
        alert(e);
      }
    },
  });

  const todoList = new (TodoList as any)({
    $target,
    initialState: this.state.todos,
    onToggle: async (id: string) => {
      try {
        await fetchData.put(id);
        getData();
      } catch (e) {
        alert(e);
      }
    },
  });

  getData();
}
