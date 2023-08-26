import { ITodo } from "../util/interface";

interface IProps {
  $target: HTMLElement;
  initialState: ITodo[];
}

interface IThis {
  state: ITodo[];
  setState: (nextState: ITodo[]) => void;
  render: () => void;
  $div: HTMLElement;
}

export default function TodoCount(
  this: IThis,
  { $target, initialState }: IProps
) {
  this.state = initialState;
  this.$div = document.createElement("div");
  $target.appendChild(this.$div);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$div.innerHTML = `
      <span class='todo-count'>전체: ${this.state.length}</span>
      <span>완료: ${
        this.state.filter((state) => state.isCompleted).length
      }</span>
    `;
  };

  this.render();
}
