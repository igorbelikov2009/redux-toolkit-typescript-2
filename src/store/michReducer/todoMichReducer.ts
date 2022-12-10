import { ITodo } from "./../../models/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// экшены
export const fetchTodosMich = createAsyncThunk("todos/fetchTodosMich", async function (_, { rejectWithValue }) {
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
    // и передам ошибку определённым образом в extraReducers, в метод [fetchTodosMich.rejected.type],
    // где её можно будет корректно обработать.
    return rejectWithValue(error.message);
  }
});

// dispatch достаём прямо отсюда
export const deleteTodoMich = createAsyncThunk(
  "todo/deleteTodoMich",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      //   console.log(response);
      if (!response.ok) {
        throw new Error("Не могу удалить задачу. Ошибка на сервере.");
      }
      // Если ошибки нет, пришёл response.ok, то... на сервере нужный объект мы уже удалили,
      // нам нужно удалить его локально, вызвать removeTodo() из todoSlice. Для того,
      // чтобы его вызвать, у нас уже есть диспетчер.
      // Мы его получили через объект вторым параметром.
      dispatch(removeTodo({ id }));
      //   const data = response.json();
      //   console.log(data);
      //   return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// <any, number, { state: ??????? }>
export const toggledStatusMich = createAsyncThunk<any, number, { state: any }>(
  "todo/toggledStatusMich",
  async function (id: number, { rejectWithValue, dispatch, getState }) {
    // Получаем общий state из getState()
    // Для каждого todo, найди тот todo, у которого его id равен тому id, который мы получили
    // в качестве параметров функции.

    const todo: ITodo = getState().todoMichReducer.todos.find((todo: ITodo) => todo.id === id);
    // console.log(todo);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Возьми у этого todo поле completed и сделай ему инверсию.
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Не могу переключить статус checkbox. Ошибка на сервере.");
      }

      dispatch(toogleTodoCompleted({ id }));
      // Мы ожидаем от сервера ответ в виде изменённых данных для проверки:
      // const data = await response.json();
      // console.log(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoMich = createAsyncThunk(
  "todo/addTodoMich",
  async function (text: string, { rejectWithValue, dispatch }) {
    try {
      // Сначала, создаём здесь объект, который будем отправлять на сервер.
      // По типу ITodo: id - создаётся автоматически, userId - захаркодим.
      // Так, как задача новая, то всегда completed: false.
      // Создаём только title, равный, в нашем случае, text.

      const todo: ITodo = {
        title: text,
        userId: 1,
        completed: false,
        id: 0,
      };

      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Не могу добавить новое дело, ошибка на сервере.");
      }

      const data = await response.json();
      //   console.log(data);
      dispatch(addTodo(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ITodoMichState {
  todo?: ITodo;
  todos: ITodo[];
  status: string | null;
  error: string | null;
}

const initialState: ITodoMichState = {
  todos: [],
  status: null,
  error: null,
};

// Сделаем хэлпер для обработки ошибок в extraReducers
const setError = (state: ITodoMichState, action: PayloadAction<string>) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoMichSlice = createSlice({
  name: "todoMich",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toogleTodoCompleted(state, action) {
      // Нам нужно найти конкретный один элемент по id, который изменился.
      // Назовём его toggledTodo.
      const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id);
      // Найденный объект, точечно, можем изменить.
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
  },
  extraReducers: {
    [fetchTodosMich.pending.type]: (state) => {
      state.status = "loading";
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [fetchTodosMich.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodosMich.rejected.type]: setError,

    [deleteTodoMich.pending.type]: (state) => {
      state.error = null; // Обнуляем, на всякий случай. Вдруг, прежде, была ошибка.
    },
    [deleteTodoMich.rejected.type]: setError,

    [toggledStatusMich.pending.type]: (state) => {
      state.error = null;
    },
    [toggledStatusMich.rejected.type]: setError,
  },
});

const { addTodo, removeTodo, toogleTodoCompleted } = todoMichSlice.actions;
export default todoMichSlice.reducer;
// регистрируем в store.ts
