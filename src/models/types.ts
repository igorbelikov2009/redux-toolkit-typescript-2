import { LocationDescriptor } from "history";

export interface IPost {
  userId?: number | string | null;
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
  id: number;
  title: string | null;
  imgUri?: string;
}

export interface IPhoto {
  albumId?: number | string | null;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface ITodo {
  userId?: number | string | null;
  id: number;
  title: string;
  completed: boolean;
}

export interface IUser {
  id: number | string | null;
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
    geo?: {
      lat: string | null;
      lng: string | null;
    };
  };

  company: {
    name: string;
    catchPhrase?: string | null;
    bs?: string | null;
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

export interface IProduct {
  id: number;
  title: string;
  price: number | string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number | string;
    count: number | string;
  };
}
