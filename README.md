### `npx create-react-app redux-toolkit-typescript --template typescript`

### `npm start`

### `npm install @reduxjs/toolkit react-redux @types/react-redux` устанавливаем react-redux, redux-toolkit и связываем всё с TypeScript

### `npm i @reduxjs/toolkit@1.6.1`

1. Создаём папку store и в ней создаём файл store.ts и папку reducers.
2. В папке hooks, в файле redux.ts создаём хуки, которые нам понадобятся для работы с редакс.
3. В папке reducers создаём редюсеры.
4. Создаём папку models, файлы IUser.ts, ITodo.ts, IPost.ts содержащие типы.
5. Создаём редюсер userSlice, импортируем его в store.ts как userReducer
6. В index.ts оборачиваем App в Provider, прокидываем в него пропс store={store}>
7. `npm install -g json-server` скачаем json-server, с помощью которого мы сможем, буквально в два действия, поднять сервер, на котором уже будет, своего рода, база данных. Скачиваем отсюда (https://github.com/typicode/json-server). Создадим файл db.json, файл с некоторыми данными из страницы по ссылке: {
   "posts": [
   { "id": 1, "title": "json-server", "author": "typicode" }
   ],
   "comments": [
   { "id": 1, "body": "some comment", "postId": 1 }
   ],
   "profile": { "name": "typicode" }
   }
8. `json-server --watch db.json` - этой командой подымаем сервер, по умолчанию сервер открывается на порту http://localhost:3000/posts/1 , но он у нас занят, поэтому в команде, дополнительно, указваем другой порт- 5000. `json-server --watch db.json --port 5000`
9. Если возникает проблема: "Невозможно загрузить файл, так как выполнение сценариев отключено в этой системе", то открываем терминал Windows - нажимаем `Win + X`. После этого выбираем Windows PowerShell (администратор), открывается Windows PowerShell. Далее, делаем по руководству
   https://www.youtube.com/watch?v=vObwhyh5h5I&t=97s
10. В окне "Windows PowerShell", в строке PS C:\Windows\system32> пишем команду

PS C:\Windows\system32> `Set-ExecutionPolicy Unrestricted -Scope CurrentUser`

11. Снова командуем `json-server --watch db.json --port 5000`
12. Сервер запустился, в нашем терминале видим
    http://localhost:5000/posts
    http://localhost:5000/comments
    http://localhost:5000/profile
    Для перехода, выбираем нужную ссылку мышкой и (ctrl + щелчок)
13. Для работы на 5000 порту открываем 2 вкладки в терминале. На одном открываем клиента, порт 3000 `npm start` , на другом подымаем сервер на 5000 порту командой `json-server --watch db.json --port 5000`

### `npm i axios` для запроса на сервер

### `npm i react-router-dom@5.3.3` `npm i @types/react-router-dom`

### `npm install react-bootstrap bootstrap` в файл index.html вставляем ссылку

 <link

rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
crossorigin="anonymous"
/>

###
