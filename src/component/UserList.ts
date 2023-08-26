import { IUser } from "../util/interface";

interface IProps {
  $target: HTMLElement;
  initialState: IUser;
}
interface IThis {
  state: IUser;
  setState: (nextState: IUser) => void;
  render: () => void;
  $div: HTMLElement;
}

export default function UserList(
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
      <div><strong>${this.state.selectedUser}</strong>의 todo-list</div>
      <ul class="user-list">
        ${this.state.users
          .map((user) => {
            return `
              <li 
                data-name='${user}'
                ${
                  user === this.state.selectedUser
                    ? "class='user-item user-item-selected'"
                    : "class='user-item'"
                }
              >${user}</li>`;
          })
          .join("")}
      </ul>    
    `;
  };

  this.render();
}
