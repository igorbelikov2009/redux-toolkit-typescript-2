import React, { FC, useState, useMemo } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { IPost } from "../../models/types";
import { postPaginationAPI } from "../../services/PostPaginationService";
import MyInput from "../gui/input/MyInput";
import MyModal from "../gui/myModal/MyModal";
import MySelect, { IOption } from "../gui/select/MySelect";
import PostPaginationItem from "../items/PostPaginationItem";
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

  const [addPost, { error: addTodomError }] = postPaginationAPI.useAddPostMutation();
  const [deletePost, { error: deleteError }] = postPaginationAPI.useDeletePostMutation();
  // .unwrap() обеспечивает нам корректную работу всех дополнительных пропов, которые
  // мы можем доставать из хуков при деструктуризации, как ниже error:
  // const { data: posts, error } = postPaginationAPI.useGetAllPostsQuery();
  const handleRemove = (post: IPost) => {
    deletePost(post);
  };
  // Создание и удаление
  //==============================
  //==============================
  // Модалка
  const [modal, setModal] = useState<boolean>(true);
  // Модалка
  //==============================

  return (
    <Container>
      <Row className="card">
        <div className="containerButton mt-2">
          <Button variant="outline-success" onClick={() => setModal(true)}>
            Создать пользователя
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
          sortedAndSearchedPosts.map((post) => <PostPaginationItem key={post.id} post={post} remove={handleRemove} />)}
        {!sortedAndSearchedPosts?.length && <h1 className="textCenter">Посты не найдены</h1>}
      </Row>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm addPost={addPost} />
      </MyModal>
    </Container>
  );
};

export default PostList;
