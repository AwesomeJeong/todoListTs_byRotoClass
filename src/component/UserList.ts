import { IUser } from "../util/interface";

interface IProps {
  $target: HTMLElement;
  initialState: IUser;
  onClick: (name: string) => void;
}
interface IThis {
  state: IUser;
  setState: (nextState: IUser) => void;
  render: () => void;
  $div: HTMLElement;
}

export default function UserList(
  this: IThis,
  { $target, initialState, onClick }: IProps
) {
  this.state = initialState;
  this.$div = document.createElement("div");
  $target.appendChild(this.$div);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$div.addEventListener("click", (event) => {
    const $eventTarget = event.target as HTMLElement;
    if ($eventTarget.className === "fav-check") {
      this.state.isShowFav = !(event.target as HTMLInputElement).checked;
      this.render();
      return;
    }

    const $li = $eventTarget.closest("li");
    if ($li) {
      const user = $li.dataset.name;
      if ($eventTarget.className === "fav-button") {
        event.stopPropagation();
        this.state.favoriteUsers.forEach((favUser) => {
          if (favUser.name === user) favUser.isFav = !favUser.isFav;
        });
        this.setState({
          ...this.state,
          favoriteUsers: this.state.favoriteUsers,
        });
        this.render();
      } else {
        if (user) onClick(user);
      }
    }
  });

  this.render = () => {
    this.$div.innerHTML = `
      <div><strong>${this.state.selectedUser}</strong>의 todo-list</div>
      <label class='fav-label'>
        <input type='checkbox' class='fav-check' ${
          this.state.isShowFav ? "" : "checked"
        } hidden />
        ${this.state.isShowFav ? "(필터:✮)" : "(필터:전체)"}
      </label>
      <ul class="user-list">
        ${this.state.users
          .filter((user, idx) => {
            if (this.state.isShowFav) {
              return this.state.favoriteUsers[idx].isFav;
            } else {
              return user === user;
            }
          })
          .map((user) => {
            return `
              <li 
                data-name='${user}'
                ${
                  user === this.state.selectedUser
                    ? "class='user-item user-item-selected'"
                    : "class='user-item'"
                }
              >
                ${user}
                <button type='button' class='fav-button'>
                  ${
                    this.state.favoriteUsers.filter(
                      (favUser) => favUser.name === user
                    )[0].isFav
                      ? "✮"
                      : "☆"
                  }
                </button>
              </li>`;
          })
          .join("")}
      </ul>    
    `;
  };

  this.render();
}
