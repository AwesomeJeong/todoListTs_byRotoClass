import { fetchData } from "../util/api.js";

interface Todo {
  _id: string;
  content: string;
  isCompleted: boolean;
}
export interface AppState {
  todos: Todo[];
}
interface This {
  state: AppState;
  setState(nextState: AppState): void;
  render(): void;
  $ul: Element;
}
export function App(
  this: This,
  {
    $target,
    initialState,
  }: {
    $target: Element;
    initialState: AppState;
  }
) {
  this.state = initialState as AppState;
  this.$ul = document.createElement("ul");
  $target.appendChild(this.$ul);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const getData = async () => {
    const data = await fetchData.get();
    this.setState({ ...this.state, todos: data });
  };

  this.render = () => {
    if (this.state.todos.length > 0) {
      const htmls = this.state.todos.map((todo) => {
        return `<li data-id='${todo._id}'><span>${todo.content}</span></li>`;
      });
      this.$ul.innerHTML = htmls.join("");
    } else {
      this.$ul.innerHTML = `<div>할 일을 추가해주세요.</div>`;
    }
  };

  getData();
  this.render();
}
