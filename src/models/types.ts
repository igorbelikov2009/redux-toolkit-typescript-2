export interface IPost {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IPhoto {
  albomId: number;
  id: number;
  title: string;
  uri: string;
  thumbnailUrl: string;
}

export interface ITodo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };

  company: {
    name: string;
  };
}

export interface IRoute {
  path: string;
  Component: React.FC<{}>;
}
