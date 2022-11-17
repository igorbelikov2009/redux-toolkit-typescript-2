import { IRoute } from "./models/IRoute";
import ApiPage from "./pages/ApiPage";
import AsyncThunkPage from "./pages/AsyncThunkPage";
import CounterPage from "./pages/CounterPage";
import MainPage from "./pages/MainPage";
import SlicePage from "./pages/SlicePage";

export const MAIN_ROUTE = "/";
export const API_ROUTE = "/api";
export const ASYNC_THUNK_ROUTE = "/thunk";
export const SLICE_ROUTE = "/slice";
export const COUNTER_ROUTE = "/counter";

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
