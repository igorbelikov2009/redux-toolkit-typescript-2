import { IComment, IPost } from "./../../models/types";
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// экшены
export const fetchPostsMich = createAsyncThunk("posts/fetchPostsMich", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=80");
    // console.log(response);

    const data = await response.json();
    return data;
  } catch (error: any) {
    // и передам ошибку определённым образом в extraReducers, в метод [fetchPostsMich.rejected.type],
    // где её можно будет корректно обработать.
    return rejectWithValue("Не удалось получить посты! " + error.message);
  }
});

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/" + id);
      // console.log(response);

      const post = await response.data;
      // console.log(post);
      return post;
    } catch (error: any) {
      // return rejectWithValue(error.message);
      return rejectWithValue("Сетевая ошибка! " + error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async function (id: string | undefined, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      // console.log(response);
      const comments = await response.data;
      // console.log(comments);
      return comments;
    } catch (error: any) {
      return rejectWithValue(error.message + "  Сетевая ошибка");
    }
  }
);

// dispatch достаём прямо отсюда
export const deletePostMich = createAsyncThunk(
  "post/deletePostMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);

      // На сервере нужный объект мы уже
      // удалили, нам нужно удалить его локально, вызвать removePost() из postMichSlice.
      // Для того, чтобы его вызвать, у нас уже есть диспетчер.
      // Мы его получили через объект вторым параметром.
      dispatch(removePost({ id }));
      //   const data = response.json();
      //   console.log(data);
      //   return data;
    } catch (error: any) {
      return rejectWithValue("Не могу удалить пост, ошибка на сервере!");
    }
  }
);

// <any, number, { state: ??????? }>
export const editPostMich = createAsyncThunk<any, IPost, { state: any }>(
  "post/editPostMich",
  async function (post: IPost, { rejectWithValue, dispatch, getState }) {
    // Получаем общий state из getState()
    // Для каждого post, найди тот post, у которого его id равен тому id, который мы получили
    // в качестве параметров функции.

    // const post: IPost = getState().postMichReducer.posts.find((post: IPost) => post.id === id);
    // console.log(post);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      // Мы ожидаем от сервера ответ в виде изменённых данных для проверки:
      const data = await response.json();
      // console.log(data);
      dispatch(editPost(data));
    } catch (error: any) {
      return rejectWithValue("Не могу обновить пост, ошибка на сервере!");
    }
  }
);

export const addPostMich = createAsyncThunk(
  "post/addPostMich",
  async function (post: IPost, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();
      //   console.log(data);
      dispatch(addPost(data));
    } catch (error: any) {
      return rejectWithValue("Не могу добавить новый пост, ошибка на сервере!");
    }
  }
);

interface IPostMichState {
  post: IPost;
  posts: IPost[];
  comments: IComment[];
  status: string | null;
  error: string | null;
  errorComments: string | null;
}

const initialState: IPostMichState = {
  post: { userId: "", id: 0, title: "", body: "" },
  comments: [],
  posts: [],
  status: null,
  error: null,
  errorComments: null,
};

// Сделаем хэлпер для обработки ошибок в extraReducers
const setError = (state: IPostMichState, action: PayloadAction<string>) => {
  state.status = "rejected";
  state.error = action.payload;
};

const postMichSlice = createSlice({
  name: "postMich",
  initialState: initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    removePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    editPost(state, action) {
      // Нам нужно найти конкретный один элемент по id, который изменился.
      // Назовём его modifiedPost.
      let modifiedPost = state.posts.find((post) => post.id === action.payload.id);

      if (modifiedPost) {
        // Найденный объект можем изменить.
        modifiedPost = action.payload;
        if (modifiedPost) {
          // осталось изменить массив: вырезать из него изменяемый post, а вместо
          // него, вставить изменённый( по сути, вновь созданный пост)
          state.posts = state.posts
            .splice(0, Number(modifiedPost.id - 1))
            .concat(modifiedPost)
            .concat(state.posts.splice(1));
          //========================================
          // console.log(action.payload);
          // console.log(modifiedPost);
          // console.log(modifiedPost.id);
          // console.log(state.posts);
        }
      }
    },
  },
  extraReducers: {
    [fetchPostsMich.pending.type]: (state) => {
      state.status = "loading";
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [fetchPostsMich.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
      state.status = "resolved";
      state.posts = action.payload;
    },
    [fetchPostsMich.rejected.type]: setError,

    [deletePostMich.pending.type]: (state) => {
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [deletePostMich.rejected.type]: setError,

    [editPostMich.pending.type]: (state) => {
      state.error = null;
    },
    [editPostMich.rejected.type]: setError,

    [fetchPostById.pending.type]: (state) => {
      state.status = "loading";
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [fetchPostById.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
      state.status = "resolved";
      state.post = action.payload;
    },
    [fetchPostById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    [fetchComments.pending.type]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchComments.fulfilled.type]: (state, action: PayloadAction<IComment[]>) => {
      state.status = "resolved";
      state.comments = action.payload;
    },
    [fetchComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = "rejected";
      state.errorComments = action.payload;
    },
  },
});

const { addPost, removePost, editPost } = postMichSlice.actions;
export default postMichSlice.reducer;
// регистрируем в store.ts
