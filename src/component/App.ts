import { fetchData } from "../util/api.js";
import { IAppState } from "../util/interface.js";
import Loading from "./Loading.js";
import TodoCount from "./TodoCount.js";

import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import UserList from "./UserList.js";

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
    todoList.setState(this.state.todos);
    todoCount.setState(this.state.todos);
    loading.setState(this.state.loading);
    userList.setState(this.state.users);
  };

  const getData = async () => {
    const data = await fetchData.get();
    const userData = await fetchData.getUsers();
    this.setState({ ...this.state, todos: data, users: userData });
  };

  const userList = new (UserList as any)({
    $target,
    initialState: this.state.users,
  });

  const todoInput = new (TodoInput as any)({
    $target,
    onInput: async (text: string) => {
      try {
        if (text.trim() !== "") {
          this.setState({
            ...this.state,
            loading: true,
          });
          await fetchData.post(text);
          getData();
        }
      } catch (e) {
        alert(e);
      } finally {
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    },
  });

  const loading = new (Loading as any)({
    $target,
    initialState: this.state.loading,
  });

  const todoCount = new (TodoCount as any)({
    $target,
    initialState: this.state.todos,
  });

  const todoList = new (TodoList as any)({
    $target,
    initialState: this.state.todos,
    onToggle: async (id: string) => {
      try {
        this.setState({
          ...this.state,
          loading: true,
        });
        await fetchData.put(id);
        getData();
      } catch (e) {
        alert(e);
      } finally {
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    },
    onRemove: async (id: string) => {
      try {
        this.setState({
          ...this.state,
          loading: true,
        });
        await fetchData.delete(id);
        getData();
      } catch (e) {
        alert(e);
      } finally {
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    },
  });

  getData();
}
