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
  $sectionUser: HTMLElement;
  $sectionTodo: HTMLElement;
}

interface IProps {
  $target: HTMLElement;
  initialState: IAppState;
}

export default function App(this: IThis, { $target, initialState }: IProps) {
  this.state = initialState as IAppState;

  // user, todo 영역 분리
  this.$sectionUser = document.createElement("section");
  this.$sectionUser.className = "user";
  this.$sectionTodo = document.createElement("section");
  this.$sectionTodo.className = "todo";

  $target.appendChild(this.$sectionUser);
  $target.appendChild(this.$sectionTodo);
  // 영역 분리 끝

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todos);
    todoCount.setState(this.state.todos);
    loading.setState(this.state.loading);
    userList.setState({
      users: this.state.users,
      selectedUser: this.state.selectedUser,
    });
  };

  const getData = async () => {
    const data = await fetchData.get(this.state.selectedUser);
    const userData = await fetchData.getUsers();
    this.setState({ ...this.state, todos: data, users: userData });
  };

  const userList = new (UserList as any)({
    $target: this.$sectionUser,
    initialState: {
      users: this.state.users,
      selectedUser: this.state.selectedUser,
    },
  });

  const todoInput = new (TodoInput as any)({
    $target: this.$sectionTodo,
    onInput: async (text: string) => {
      try {
        if (text.trim() !== "") {
          this.setState({
            ...this.state,
            loading: true,
          });
          await fetchData.post(text, this.state.selectedUser);
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
    $target: this.$sectionTodo,
    initialState: this.state.loading,
  });

  const todoCount = new (TodoCount as any)({
    $target: this.$sectionTodo,
    initialState: this.state.todos,
  });

  const todoList = new (TodoList as any)({
    $target: this.$sectionTodo,
    initialState: this.state.todos,
    onToggle: async (id: string) => {
      try {
        this.setState({
          ...this.state,
          loading: true,
        });
        await fetchData.put(id, this.state.selectedUser);
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
        await fetchData.delete(id, this.state.selectedUser);
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
