import { IPost } from "./../../models/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// экшены
export const fetchPostsMich = createAsyncThunk("posts/fetchPostsMich", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=20");
    // console.log(response);

    if (!response.ok) {
      // Если у меня будет ошибка, то я её поймаю
      throw new Error("Ошибка на сервере.");
    }

    // Если ошибки нет,то....
    const date = await response.json();
    return date;
  } catch (error: any) {
    // и передам ошибку определённым образом в extraReducers, в метод [fetchPostsMich.rejected.type],
    // где её можно будет корректно обработать.
    return rejectWithValue(error.message);
  }
});

// dispatch достаём прямо отсюда
export const deletePostMich = createAsyncThunk(
  "post/deletePostMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);
      if (!response.ok) {
        throw new Error("Не могу удалить задачу. Ошибка на сервере.");
      }
      // Если ошибки нет, пришёл response.ok, то... на сервере нужный объект мы уже удалили,
      // нам нужно удалить его локально, вызвать removePost() из postslice. Для того,
      // чтобы его вызвать, у нас уже есть диспетчер.
      // Мы его получили через объект вторым параметром.
      dispatch(removePost({ id }));
      //   const data = response.json();
      //   console.log(data);
      //   return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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

      if (!response.ok) {
        throw new Error("Не могу обновить пост. Ошибка на сервере.");
      }

      // dispatch(editPost(data));
      // Мы ожидаем от сервера ответ в виде изменённых данных для проверки:
      const data = await response.json();
      console.log(data);
      dispatch(editPost(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
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

      if (!response.ok) {
        throw new Error("Не могу добавить новый пост, ошибка на сервере.");
      }

      const data = await response.json();
      //   console.log(data);
      dispatch(addPost(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IPostMichState {
  // post: IPost;
  posts: IPost[];
  status: string | null;
  error: string | null;
}

const initialState: IPostMichState = {
  posts: [],
  status: null,
  error: null,
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
  },
});

const { addPost, removePost, editPost } = postMichSlice.actions;
export default postMichSlice.reducer;
// регистрируем в store.ts
