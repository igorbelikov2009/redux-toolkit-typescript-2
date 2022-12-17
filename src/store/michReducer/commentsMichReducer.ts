import axios from "axios";
import { IComment } from "./../../models/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchCommentsMich = createAsyncThunk(
  "comments/fetchCommentsMich",
  async function (params: { limit: number; page: number }, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?_limit=${params.limit}&_page=${params.page}`
      );

      if (!response) {
        // Если у меня будет ошибка, то я её поймаю
        throw new Error("Ошибка на сервере.");
      }
      // console.log(response);
      // Если ошибки нет,то....

      const totalCount = response.headers["x-total-count"];
      // console.log(totalCount);

      const comments = await response.data;
      // console.log(comments);

      const res = { totalCount, comments };
      // console.log(res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// dispatch достаём прямо отсюда
export const deleteCommentMich = createAsyncThunk(
  "comment/deleteCommentMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не могу удалить задачу. Ошибка на сервере.");
      }
      dispatch(removeComment({ id }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCommentMich = createAsyncThunk<any, IComment, { state: any }>(
  "comment/editCommentMich",
  async function (comment: IComment, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error("Не могу обновить коммент. Ошибка на сервере.");
      }

      const data = await response.json();
      dispatch(editComment(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCommentMich = createAsyncThunk(
  "comment/addCommentMich",
  async function (comment: IComment, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error("Не могу добавить новый комментарий, ошибка на сервере.");
      }

      const data = await response.json();
      dispatch(addComment(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IRes {
  totalCount: number;
  comments: IComment[];
}

interface ICommentMichState {
  // res: {
  //   totalCount: number;
  //   comments: IComment[];
  // };

  res: IRes;
  status: string | null;
  error: string | null;
  totalPages: number;
}

const initialState: ICommentMichState = {
  res: {
    comments: [],
    totalCount: 0,
  },
  status: null,
  error: null,
  totalPages: 0,
};

// Сделаем хэлпер для обработки ошибок в extraReducers
const setError = (state: ICommentMichState, action: PayloadAction<string>) => {
  state.status = "rejected";
  state.error = action.payload;
};

const commentMichSlice = createSlice({
  name: "commentMich",
  initialState: initialState,
  reducers: {
    addComment(state, action) {
      state.res.comments.push(action.payload);
    },
    removeComment(state, action) {
      state.res.comments = state.res.comments.filter((comment) => comment.id !== action.payload.id);
    },
    editComment(state, action) {
      // Нам нужно найти конкретный один элемент по id, который изменился.
      // Назовём его modifiedComment.
      let modifiedComment = state.res.comments.find((coment) => coment.id === action.payload.id);

      if (modifiedComment) {
        // Найденный объект можем изменить.
        modifiedComment = action.payload;
        if (modifiedComment) {
          // осталось изменить массив: вырезать из него изменяемый coment, а вместо
          // него, вставить изменённый( по сути, вновь созданный пост)
          state.res.comments = state.res.comments
            .splice(0, Number(modifiedComment.id - 1))
            .concat(modifiedComment)
            .concat(state.res.comments.splice(1));
        }
      }
    },
  },
  extraReducers: {
    [fetchCommentsMich.pending.type]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCommentsMich.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.res = action.payload;
      // console.log(state.res);
      state.status = "resolved";
    },
    [fetchCommentsMich.rejected.type]: setError,

    [deleteCommentMich.pending.type]: (state) => {
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [deleteCommentMich.rejected.type]: setError,

    [editCommentMich.pending.type]: (state) => {
      state.error = null;
    },
    [editCommentMich.rejected.type]: setError,
  },
});

const { addComment, removeComment, editComment } = commentMichSlice.actions;
export default commentMichSlice.reducer;
// регистрируем в store.ts
