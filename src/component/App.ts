export interface AppState {
  todos: [];
}
interface This {
  state: Object;
  setState(): void;
  render(): void;
  $form: Element;
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
  this.$form = document.createElement("form");
  $target.appendChild(this.$form);
  this.render = () => {
    this.$form.innerHTML = `
      <input type='text' />
    `;
  };

  this.render();
}
