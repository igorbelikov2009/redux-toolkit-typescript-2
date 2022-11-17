// В редакс редюсер - это просто по сути чистая функция, которая принимает
// state, action. В зависимости от экшена, редюсер как-то изменяет state и
// возвращает его нам в обновлённом виде. В редакс-тулкит есть, так называемые,
// слайсы. Это некоторая обёртка над редюсерами, которая добовляет дополнительный
// функционал и упрощает работу.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Создаём интерфейс для состояния счётчика
interface ICounterState {
  count: number;
}

// Создаём объект (начальное состояние) типа ICounterState
const initialState: ICounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter", // Уникальное название слайса.
  initialState: initialState, // Сюда мы передаём дефолтное значение.
  // Поле reducers аналогично конструкции switch-case, которое
  // мы используем в обычном редюсере.
  // То есть каждый case в данном случае идёт, как отдельный редюсер.
  // И внутри его мы уже будем определять, как мы изменим наше состояние.
  reducers: {
    // C redux-toolkit нам не надо разворачивать весь ...state и менять в нём
    // отдельное поле: return { ...state. field: action.payload }
    // В redux-toolkit мы сразу меняем поле: state.object.field = action.payload
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
      // обращаемся к полю count у state, и преплюсуем к нему то, что пришло к нам в экшене
      // в поле payload с сервера. Обычно, туда передают какие-то данные, для того, чтобы
      // поместить их в state.
    },
    decrement(state, action: PayloadAction<number>) {
      state.count -= action.payload;
    },
    multiplication(state, action: PayloadAction<number>) {
      state.count *= action.payload;
    },
    divide(state, action: PayloadAction<number>) {
      state.count /= action.payload;
    },
  },
});
// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер. Например:
export default counterSlice.reducer;
