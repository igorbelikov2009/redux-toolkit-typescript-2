import { IPost } from "./../../models/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAsyncThunkPosts } from "./ActionCreater";

// Создаём интерфейс для initialState для слайс-редюсера
interface IPostState {
  posts: IPost[];
  isLoading: boolean;
  error: string | undefined;
}

// Создаём объект initialState типа IUserState
const initialState: IPostState = {
  posts: [],
  isLoading: false,
  error: "",
};

// Создаём редюсер-слайс при помощи функции createSlice()
export const postAsuncThunkSlice = createSlice({
  name: "postAsyncThunk",
  initialState: initialState,
  // Когда мы в ActionCreater.ts используем createAsyncThunk, то в редюсерсы
  // записываем пустой объект: reducers: {},
  reducers: {},
  // и создаём extraReducers, в нём для нас уже автоматически создаются
  // три состояния: pending (в ожидании), rejected (отклоненный)
  // и fulfilled (выполненный)
  extraReducers: {
    [fetchAsyncThunkPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = false;
      state.error = ""; // обнуляем ошибку, на случай, если он возникала ранее
      state.posts = action.payload;
    },
    [fetchAsyncThunkPosts.pending.type]: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = true;
    },
    [fetchAsyncThunkPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер. Например:

export default postAsuncThunkSlice.reducer;
