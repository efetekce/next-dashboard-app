export interface Board {
  id: number;
  name: string;
  openAction?: boolean;
  completeAction?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  tasks?: Task[] | [];
}

export interface Task {
  id: number;
  createdUserId?: number;
  name: string;
  description?: any;
  code?: number;
  boardId?: number;
  flagId?: number;
  order?: number;
  startDate?: any;
  endDate?: any;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  deletedUserId?: any;
}

export type Column = {
  id: Id;
  title: string;
};

export type Id = string | number;
