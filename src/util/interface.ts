export interface ITodo {
  _id: string;
  content: string;
  isCompleted: boolean;
}

interface IFavoritUser {
  name: string;
  isFav: boolean;
}
export interface IUser {
  users: string[];
  selectedUser: string;
  favoriteUsers: IFavoritUser[];
  isShowFav: boolean;
}

export interface IAppState extends IUser {
  todos: ITodo[];
  loading: boolean;
}
