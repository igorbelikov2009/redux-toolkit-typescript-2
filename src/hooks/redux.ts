import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispacth, RootState } from "../store/store"; // Базовые типы,
// которые мы получали в файле store.ts

// По сути, это обычный useDispatch, который мы возвращаем, но здесь у нас происходит
// типизация. Будем использовать типизированный диспатч.
export const useAppDispanch = () => useDispatch<AppDispacth>();

// Аналогично, это будет хук useSelector, но типизированный. Для этого используем
// специальный тип TypedUseSelectorHook, и туда передаём RootState, который мы получали
// в файле store.ts
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
