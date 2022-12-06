import React, { useState, FC } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { postPaginationAPI } from "../../services/PostApiService";
import PaginationButtons from "../gui/PaginationButtons";

interface PostListProps {
  topOfPage: () => void;
}

const PostList: FC<PostListProps> = ({ topOfPage }) => {
  // Для пагинации нам необходимо получить общее количество постов. По этому мы
  // получаем все посты, но не выводим их, просто вычисляем totalCount.
  const { data: totalCountElem } = postPaginationAPI.useGetAllPostsQuery();
  let totalCount: number = 0;

  if (totalCountElem) {
    totalCount = totalCountElem.length;
  }

  // Получаем limit, page по параметрам, установленным в postPaginationAPI в эндпоинте:
  //  getPostsPagination: query: (page: number = 1, limit: number = 10)
  const [page, setPage] = useState<number>(1);
  // Здесь, limit у нас взят так же из параметров, для расчётов. Здесь мы его не можем
  // менять. В дальнейшем, limit надо будет получать из параметра запроса.
  const [limit] = useState<number>(10);
  const { data: posts } = postPaginationAPI.useGetPostsPaginationQuery(page);

  // Вычисляем количество страниц
  let countPage: number = Math.ceil(totalCount / limit);
  // console.log(countPage);

  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }

  return (
    <Container>
      <Row>
        <PaginationButtons page={page} pages={pages} countPage={countPage} setPage={setPage} />

        {posts &&
          posts.map((post) => (
            <Card key={post.id}>
              <i className="displayBlock">
                <b> Пост № {post.id} </b> {post.title}.
              </i>

              <i className="displayBlock">
                <b> Пост: </b> {post.body}
              </i>
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export default PostList;
