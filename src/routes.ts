import AlbumsMichContainer from "./components/forMichaelPage/AlbumsMichContainer";
import CommentsMichContainer from "./components/forMichaelPage/CommentsMichContainer";
import AlbumIdPageMich from "./components/forMichaelPage/idPageMich/AlbumIdPageMich";
import PostIdPageMich from "./components/forMichaelPage/idPageMich/PostIdPageMich";
import UserIdPageMich from "./components/forMichaelPage/idPageMich/UserIdPageMich";
import PageAlbumsOfUser from "./components/forMichaelPage/pageOfUser/PageAlbumsOfUser";
import PagePostsOfUser from "./components/forMichaelPage/pageOfUser/PagePostsOfUser";
import PageTodosOfUser from "./components/forMichaelPage/pageOfUser/PageTodosOfUser";
import PhotosMichContainer from "./components/forMichaelPage/PhotosMichContainer";
import PostMichContainer from "./components/forMichaelPage/PostMichContainer";
import ProductsMichContainer from "./components/forMichaelPage/ProductsMichContainer";
import TodosMichContainer from "./components/forMichaelPage/TodosMichContainer";
import UsersMichContainer from "./components/forMichaelPage/UsersMichContainer";
import { IRoute } from "./models/types";
import ApiPage from "./pages/ApiPage";
import AsyncThunkPage from "./pages/AsyncThunkPage";
import CounterPage from "./pages/CounterPage";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import MichaelPage from "./pages/MichaelPage";
import SlicePage from "./pages/SlicePage";

export const MAIN_ROUTE = "/";
export const API_ROUTE = "/api";
export const ASYNC_THUNK_ROUTE = "/thunk";
export const SLICE_ROUTE = "/slice";
export const COUNTER_ROUTE = "/counter";
export const MICHAEL_ROUTE = "/michael";
export const MICHAEL_USERS_ROUTE = "/michael/users";
export const MICHAEL_USERS_ROUTE_ID = "/michael/users/:id";
export const MICHAEL_USERS_ROUTE_ID_POSTS = "/michael/users/:id/posts";
export const MICHAEL_USERS_ROUTE_ID_ALBUMS = "/michael/users/:id/albums";
export const MICHAEL_USERS_ROUTE_ID_TODOS = "/michael/users/:id/todos";
export const MICHAEL_POSTS_ROUTE = "/michael/posts";
export const MICHAEL_POSTS_ROUTE_ID = "/michael/posts/:id";
export const MICHAEL_COMMENTS_ROUTE = "/michael/comments";
export const MICHAEL_ALBUMS_ROUTE = "/michael/albums";
export const MICHAEL_ALBUMS_ROUTE_ID = "/michael/albums/:id";
export const MICHAEL_PHOTOS_ROUTE = "/michael/photos";
export const MICHAEL_TODOS_ROUTE = "/michael/todos";
export const MICHAEL_PRODUCTS_ROUTE = "/michael/products";
export const LOGIN = "/login";

export const routes: IRoute[] = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: API_ROUTE,
    Component: ApiPage,
  },
  {
    path: ASYNC_THUNK_ROUTE,
    Component: AsyncThunkPage,
  },
  {
    path: SLICE_ROUTE,
    Component: SlicePage,
  },
  {
    path: COUNTER_ROUTE,
    Component: CounterPage,
  },
];

export const michaelRoutes: IRoute[] = [
  {
    path: MICHAEL_ROUTE,
    Component: MichaelPage,
  },
  {
    path: MICHAEL_USERS_ROUTE,
    Component: UsersMichContainer,
  },
  {
    path: MICHAEL_USERS_ROUTE_ID,
    Component: UserIdPageMich,
  },
  {
    path: MICHAEL_USERS_ROUTE_ID_POSTS,
    Component: PagePostsOfUser,
  },
  {
    path: MICHAEL_USERS_ROUTE_ID_ALBUMS,
    Component: PageAlbumsOfUser,
  },
  {
    path: MICHAEL_USERS_ROUTE_ID_TODOS,
    Component: PageTodosOfUser,
  },
  {
    path: MICHAEL_POSTS_ROUTE,
    Component: PostMichContainer,
  },
  {
    path: MICHAEL_POSTS_ROUTE_ID,
    Component: PostIdPageMich,
  },
  {
    path: MICHAEL_COMMENTS_ROUTE,
    Component: CommentsMichContainer,
  },
  {
    path: MICHAEL_ALBUMS_ROUTE,
    Component: AlbumsMichContainer,
  },
  {
    path: MICHAEL_ALBUMS_ROUTE_ID,
    Component: AlbumIdPageMich,
  },
  {
    path: MICHAEL_PHOTOS_ROUTE,
    Component: PhotosMichContainer,
  },
  {
    path: MICHAEL_TODOS_ROUTE,
    Component: TodosMichContainer,
  },
  {
    path: MICHAEL_PRODUCTS_ROUTE,
    Component: ProductsMichContainer,
  },
];

export const publicRoutes: IRoute[] = [{ path: LOGIN, Component: Login }];
