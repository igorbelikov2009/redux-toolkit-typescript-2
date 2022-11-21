import { LocationDescriptor } from "history";

export interface IPost {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

export interface IComment {
  postId: number | string | null;
  id: number;
  name: string | null;
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
  url: string;
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
export interface INavbarButton {
  id: number;
  route: LocationDescriptor<unknown>;
  title: string;
  active: boolean;
}
