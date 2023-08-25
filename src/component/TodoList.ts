import { ITodo } from "../util/interface";

interface IThis {
  state: ITodo[];
  setState: (nextState: ITodo[]) => void;
  render: () => void;
  $div: Element;
}

interface IProps {
  $target: Element;
  initialState: ITodo[];
}

export default function TodoList(
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
    if (this.state.length > 0) {
      const htmls = this.state.map((todo) => {
        return `<li data-id='${todo._id}'><span>${todo.content}</span></li>`;
      });
      this.$div.innerHTML = `<ul>${htmls.join("")}</ul>`;
    } else {
      this.$div.innerHTML = `<div>할 일을 추가해주세요.</div>`;
    }
  };

  this.render();
}
