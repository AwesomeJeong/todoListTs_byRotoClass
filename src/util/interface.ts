export interface ITodo {
  _id: string;
  content: string;
  isCompleted: boolean;
}

export interface IUser {
  users: [];
  selectedUser: string;
}

export interface IAppState extends IUser {
  todos: ITodo[];
  loading: boolean;
}
