interface IProps {
  $target: HTMLElement;
  initialState: string[];
}
interface IThis {
  state: string[];
  setState: (nextState: string[]) => void;
  render: () => void;
  $ul: HTMLElement;
}

export default function UserList(
  this: IThis,
  { $target, initialState }: IProps
) {
  this.state = initialState;
  this.$ul = document.createElement("ul");
  $target.appendChild(this.$ul);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$ul.innerHTML = this.state
      .map((state) => {
        return `<li data-name='${state}'>${state}</li>`;
      })
      .join("");
  };

  this.render();
}
