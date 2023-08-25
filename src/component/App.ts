import { fetchData } from "../util/api.js";
import { IAppState } from "../util/interface.js";

interface This {
  state: IAppState;
  setState(nextState: IAppState): void;
  render(): void;
  $ul: Element;
}
export default function App(
  this: This,
  {
    $target,
    initialState,
  }: {
    $target: Element;
    initialState: IAppState;
  }
) {
  this.state = initialState as IAppState;
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
