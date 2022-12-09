import React, { FC, useState, useMemo } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { IPost } from "../../models/types";
import { postPaginationAPI } from "../../services/PostPaginationService";
import MyInput from "../gui/input/MyInput";
import MySelect, { IOption } from "../gui/select/MySelect";
import PostForm from "../modal/PostForm";

interface PostListProps {
  topOfPage: () => void;
}

const PostList: FC<PostListProps> = ({ topOfPage }) => {
  const { data: posts, error } = postPaginationAPI.useGetAllPostsQuery();
  //==============================
  // Сортировка и поиск
  const opions: IOption[] = [
    { value: "id", name: "По номеру поста" },
    { value: "title", name: "По заглавию поста" },
    { value: "body", name: "По содержимому поста" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Отсортированный массив: sortedPosts
  const sortedPosts = useMemo(() => {
    if (selectedSort && posts) {
      return [...posts].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return posts;
  }, [selectedSort, posts]);

  // Отсортированный и отфильтрованный массив: sortedAndSearchedPosts
  const sortedAndSearchedPosts = useMemo(() => {
    // Нам необходимо отфильтровать массив по поисковой строке. В колбеке обращаемся
    // к названию поста: post.title, и вызываем у него функцию includes(включено).
    // То есть, что-то ввели в поисковую строку и по includes(searchQuery) ищем совпадения.
    // Совпадения символов есть - пост остаётся в массиве. Нет совпадений - пост удаляется
    // из массива. Таким образом остаются те посты, у которых в названии (post.title)
    // имеются символы, набранные в инпуте поисковой строки.
    if (sortedPosts) {
      return sortedPosts.filter((post) => post.title.toLocaleLowerCase().includes(searchQuery));
    }
  }, [searchQuery, sortedPosts]);

  const sortPosts = (sort: string) => {
    setSelectedSort(sort);
    // console.log(sort);
  };
  // Сортировка и поиск
  //==============================
  //==============================
  // Создание и удаление
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [addPost, { error: addTodomError }] = postPaginationAPI.useAddPostMutation();
  const [deletePost, { error: deleteError }] = postPaginationAPI.useDeletePostMutation();
  const handleAddPost = async () => {
    if (newTitle && newBody) {
      await addPost({
        title: newTitle,
        body: newBody,
        id: 0,
      }).unwrap();
      setNewTitle("");
      setNewBody("");
    }
  };
  // .unwrap() обеспечивает нам корректную работу всех дополнительных пропов, которые
  // мы можем доставать из хуков при деструктуризации, как ниже error:
  // const { data: posts, error } = postPaginationAPI.useGetAllPostsQuery();

  // Создание и удаление
  //==============================

  return (
    <Container>
      <Row className="card">
        {/* <PostForm create={handleCreate} /> */}
        <div className="containerButton"></div>
        <div className="card mr-2">
          <Form.Control
            className="mb-2"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Введите название нового поста"
          />
          <Form.Control
            className="mb-2"
            type="text"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Введите текст нового поста"
          />
          <Button variant="outline-success" onClick={handleAddPost}>
            Добавить новый пост
          </Button>
        </div>
        <div className="card">
          <h6> Компоненты поиска и выбора алгоритма сортировки раздельны друг от друга...</h6>

          <MyInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск..." />

          <div className="containerButton mt-2">
            <MySelect
              defaultValue="Сортировка"
              disabled={true}
              options={opions}
              value={selectedSort}
              onChangeValue={sortPosts}
            />
          </div>
        </div>

        <>
          {error && <h1 className="textCenter">Произошла ошибка при получении постов</h1>}
          {addTodomError && <h1 className="textCenter">Произошла ошибка при добавлении поста</h1>}
          {deleteError && <h1 className="textCenter">Произошла ошибка при удалении поста</h1>}
        </>

        {sortedAndSearchedPosts &&
          sortedAndSearchedPosts.map((post) => (
            <Card key={post.id} className="post">
              <div className="cardBlock">
                <div className="cardDescription">
                  <i className="displayBlock">
                    Пост № <b> {post.id} </b>
                  </i>

                  <i className="displayBlock">
                    <b> Заглавие: </b> {post.title}.
                  </i>

                  <i className="displayBlock">
                    <b> Содержимое: </b> {post.body}
                  </i>
                </div>

                <div className="cardButton">
                  <Button variant="outline-danger" className="mt-2" onClick={() => deletePost(post)}>
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        {!sortedAndSearchedPosts?.length && <h1 className="textCenter">Посты не найдены</h1>}
      </Row>
    </Container>
  );
};

export default PostList;
