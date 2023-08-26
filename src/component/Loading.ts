import { ITodo } from "../util/interface";

interface IProps {
  $target: HTMLElement;
  initialState: boolean;
}
interface IThis {
  state: boolean;
  setState: (nextState: boolean) => void;
  render: () => void;
  $div: HTMLElement;
}

export default function Loading(
  this: IThis,
  { $target, initialState }: IProps
) {
  this.state = initialState;
  this.$div = document.createElement("div");
  this.$div.className = "todo-loading";

  const $form = $target.querySelector("form");
  // querySelector 에서 null이 추정될 경우 어떻게 처리할 것인가 ?
  if ($form) $form.appendChild(this.$div);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$div.style.display = this.state ? "flex" : "none";
    this.$div.innerText = `Loading...`;
  };
  this.render();
}
