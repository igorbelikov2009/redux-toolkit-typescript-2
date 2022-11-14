### `npx create-react-app redux-toolkit-typescript --template typescript`

### `npm start`

### `npm install @reduxjs/toolkit react-redux @types/react-redux` устанавливаем react-redux, redux-toolkit и связываем всё с TypeScript

### `npm i @reduxjs/toolkit@1.6.1`

1. Создаём папку store и в ней создаём файл store.ts и папку reducers.
2. В папке hooks, в файле redux.ts создаём хуки, которые нам понадобятся для работы с редакс.
3. В папке reducers создаём редюсеры.
4. Создаём папку models, файл IUser.ts, содержащий типы
5. Создаём редюсер userSlice, импортируем его в store.ts как userReducer
6. В index.ts оборачиваем App в Provider, прокидываем в него пропс store={store}>

### `npm i axios` для запроса на сервер
