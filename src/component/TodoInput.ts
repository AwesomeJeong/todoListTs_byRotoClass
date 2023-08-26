interface IThis {
  $form: HTMLFormElement;
  render: () => void;
}

interface IProps {
  $target: Element;
  onInput: (text: string) => void;
}

export default function TodoInput(this: IThis, { $target, onInput }: IProps) {
  this.$form = document.createElement("form");
  $target.appendChild(this.$form);

  this.render = () => {
    this.$form.innerHTML = `
      <input type='text' placeholder='할 일 입력' id='todo-input' />
      <input type='submit' value='추가' id='todo-add' />
    `;
  };

  this.render();

  this.$form.addEventListener("submit", (event) => {
    event.preventDefault();
    const $input = <HTMLInputElement>document.querySelector("#todo-input");
    const todoText: string = $input.value;
    onInput(todoText);
    $input.value = "";
    $input.focus();
  });
}
