import React, { useState, useEffect } from "react";
import { IPost } from "../../models/types";
import { postAPI } from "../../services/PostService";
import { Button, Row, Card } from "react-bootstrap";
import PostItem from "../items/PostItem";

const PostContainer2 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(100);

  // параметр 100 - это мы задаём значение для limit

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ FetchAllPosts
  // Первым аргументом хука useFetchAllPostsQuery(limit) ожидается параметр, который
  // будет использоваться в запросе.
  // const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(limit);

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ FetchAllPosts
  const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit);
  // refetch достаём из списка при деструктуризации.

  // Подгружаем 2 разных списка, с разным лимитом, по одному запросу.
  // Таким образом происходит кэширование данных.
  // Это бывает крайне полезно, когда у нас есть, например, выпадающие списки
  // с данными, которые подгружаются асинхронно. Эти списки используются в
  // приложении и например, повсеместно, и чтобы получить данные для этих
  // списков, нам достаточно использовать хуки и быть уверенными в том, что
  // у нас не будет лишних запросов.

  // Поскольку, мы уже описали эндпоинт в PostService - createPost, с помощью которого
  // будем пост создавать, для нас был сгенерирован автоматически хук useCreatePostMutation,
  // по названию того эндпоинта, который мы создавали. Этим хуком мы можем воспользоваться.
  // В опциях () мы можем указывать селектор и получать какие-то определённые данные,
  // то есть отфильтрованные по какому-то условию.
  // Данный хук возвращает нам не объект с какими-то данными, а массив, где первый
  // элемент - это функция, которую мы можем вызвать для того, чтобы произошла
  // мутация. А второй - это объект, в котором находятся поля: isLoading, data, error и тд,
  // которые мы, при необходимости, можем обрабатывать.
  // И при загрузке данных и при создании поста, поле ошибки называется error, а
  // поле индикации загрузки - isLoading. Чтобы не было путаницы, мы прямо здесь,
  // через двоеточие, меняем название.

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ createPost
  const [createPost, { error: createError, isLoading: createIsLoading }] = postAPI.useCreatePostMutation();

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ deletePost
  const [deletePost, { error: deleteError }] = postAPI.useDeletePostMutation();

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ updatePost
  const [updatePost, { error: updateError }] = postAPI.useUpdatePostMutation();

  useEffect(() => {
    setTimeout(() => {
      setLimit(3);
    }, 2000);
  }, [limit]);

  // аргументом в асинхронную функцию createPost() нам надо передать объект типа IPost
  // и поскольку ID у нас будет генерировать сервер, явно укажем, что объект as IPost
  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };
  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <h3 className="textCenter mb-2">Список пользователей</h3>

      <div className="containerButton mb-4">
        <Button onClick={() => refetch()} variant="outline-success">
          REFETCH
        </Button>
      </div>

      <Row>
        <Card className="mb-4">
          <h6>
            Работу функции refetch() наблюдаем в рабочей консоле, в вкладке "Сеть". Счётчик запросов (Запросы: 37)
            увеличивается с каждым кликом по кнопке.
          </h6>
        </Card>
      </Row>

      <div className="containerButton">
        <Button variant="outline-success" onClick={handleCreate}>
          Добавить новый пост
        </Button>
      </div>

      <div>
        {isLoading && <h1> Идёт загрузка</h1>}

        {createIsLoading && <h1>Создаётся новый пост</h1>}
      </div>

      <div>
        <>
          {error && (
            <h1>
              <> Произошла ошибка при загрузке. </>
            </h1>
          )}
        </>

        <>
          {createError && (
            <h1>
              <> Произошла ошибка при создании нового поста. </>
            </h1>
          )}
        </>

        <>
          {deleteError && (
            <h1>
              <> Произошла ошибка при удалении поста. </>
            </h1>
          )}
        </>

        <>
          {updateError && (
            <h1>
              <> Произошла ошибка при обновлении поста. </>
            </h1>
          )}
        </>
      </div>

      {/* Добавляем проверку: если у нас есть посты, и они не undefined  */}
      <div className="post">
        {posts &&
          posts.map((post: IPost) => (
            <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />
          ))}
      </div>
    </div>
  );
};
export default PostContainer2;
