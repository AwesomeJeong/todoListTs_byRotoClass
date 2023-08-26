export interface ITodo {
  _id: string;
  content: string;
  isCompleted: boolean;
}

export interface IAppState {
  todos: ITodo[];
  loading?: boolean;
}
