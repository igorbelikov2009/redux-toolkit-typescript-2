import { ITodo } from "./../models/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchTodosSepar = createAsyncThunk("todos/fetchTodosSepar", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
    // console.log(response);

    if (!response.ok) {
      // Если у меня будет ошибка, то я её поймаю
      throw new Error("Ошибка на сервере.");
    }

    // Если ошибки нет,то....
    const date = await response.json();
    return date;
  } catch (error: any) {
    // и передам ошибку определённым образом в extraReducers, в метод [fetchTodosSepar.rejected.type],
    // где её можно будет корректно обработать.
    return rejectWithValue(error.message);
  }
});

//   dispatch достаём прямо отсюда
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Не могу удалить задачу. Ошибка на сервере.");
      }
      // Если ошибки нет, пришёл response.ok, то... на сервере нужный объект мы уже удалили, нам нужно удалить
      // его локально, вызвать removeTodo() из todoSlice. Для того, чтобы его вызвать, у нас уже есть диспетчер.
      // Мы его получили через объект вторым параметром.
      dispatch(removeTodo({ id }));
      // const data = response.json();
      // console.log(data);
      // return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//^^^action^^^===============================================================================

interface ITodoSeparState {
  todos: ITodo[];
  status: string | null; // as isLoading
  error: string | null;
}

const initialState: ITodoSeparState = {
  todos: [],
  status: null,
  error: null,
};

// Сделаем хэлпер для обработки ошибок в extraReducers
const setError = (state: ITodoSeparState, action: PayloadAction<string>) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSeparSlice = createSlice({
  name: "todoSepar",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      console.log(state, action);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },

  extraReducers: {
    [fetchTodosSepar.pending.type]: (state) => {
      state.status = "loading";
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [fetchTodosSepar.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodosSepar.rejected.type]: setError,

    [deleteTodo.pending.type]: (state) => {
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [deleteTodo.rejected.type]: setError,
  },
});

const { addTodo, removeTodo } = todoSeparSlice.actions;
export default todoSeparSlice.reducer;
