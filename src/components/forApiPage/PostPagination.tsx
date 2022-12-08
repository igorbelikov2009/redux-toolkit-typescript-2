import React, { FC, useState, useMemo } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { postPaginationAPI } from "../../services/PostPaginationService";
import MyInput from "../gui/input/MyInput";
import MySelect, { IOption } from "../gui/select/MySelect";

interface PostListProps {
  topOfPage: () => void;
}

const PostList: FC<PostListProps> = ({ topOfPage }) => {
  const { data: posts } = postPaginationAPI.useGetAllPostsQuery();
  //==============================
  // Сортировка и поиск
  const opions: IOption[] = [
    { value: "id", name: "По номеру поста" },
    { value: "title", name: "По заглавию поста" },
    { value: "body", name: "По содержимому поста" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // function getSortedPosts() {
  //   if (selectedSort && posts) {
  //     return [...posts].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
  //   }
  //   return posts;
  // }

  // Отсортированный массив: sortedPosts
  const sortedPosts = useMemo(() => {
    // console.log("Отработала функция getSortedPosts");
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

  return (
    <Container>
      <Row>
        <div className="card mt-4 mb-2">
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

        {sortedAndSearchedPosts &&
          sortedAndSearchedPosts.map((post) => (
            <Card key={post.id}>
              <i className="displayBlock">
                Пост № <b> {post.id} </b>
              </i>

              <i className="displayBlock">
                <b> Заглавие: </b> {post.title}.
              </i>

              <i className="displayBlock">
                <b> Содержимое: </b> {post.body}
              </i>
            </Card>
          ))}

        {!sortedAndSearchedPosts?.length && <h1 className="textCenter">Посты не найдены</h1>}
      </Row>
    </Container>
  );
};

export default PostList;
