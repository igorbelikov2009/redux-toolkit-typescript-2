import React, { useState, FC } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { postPaginationAPI } from "../../services/PostApiService";

interface PostListProps {
  topOfPage: () => void;
}

const PostList: FC<PostListProps> = ({ topOfPage }) => {
  // Для пагинации нам необходимо получить общее количество постов. По этому мы
  // получаем все посты, но не выводим их, просто вычисляем totalCountPosts.
  const { data: posts } = postPaginationAPI.useGetAllPostsQuery();
  let totalCountPosts: number = 0;

  if (posts) {
    totalCountPosts = posts.length;
  }
  // console.log(totalCountPosts);

  // Получаем данные по параметрам, установленным в postPaginationAPI в эндпоинте:
  //  getPostsPagination: query: (page: number = 1, limit: number = 10)
  const [page, setPage] = useState<number>(1);
  // Здесь, limit у нас взят так же из параметров, для расчётов. Здесь мы его не можем
  // менять. В дальнейшем, limit надо будет получать из параметра запроса.
  const [limit] = useState<number>(10);
  const { data: postPagination } = postPaginationAPI.useGetPostsPaginationQuery(page);

  // Вычисляем количество страниц
  let countPage: number = Math.ceil(totalCountPosts / limit);
  // console.log(countPage);

  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }

  const handleIncrement: () => void = () => {
    if (page < countPage) {
      setPage(page + 1);
    }
  };

  const handleDecrement: () => void = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Container>
      <Row>
        <div className="containerButton  mb-2">
          <Button variant="outline-primary" onClick={handleDecrement}>
            Prev page
          </Button>

          <div className="displayFlex">
            {pages.map((p) => (
              <Button variant="outline-primary" onClick={() => setPage(p)} active={p === page} key={p}>
                {p}
              </Button>
            ))}
          </div>

          <Button variant="outline-primary" onClick={handleIncrement}>
            Next page
          </Button>
        </div>

        {postPagination &&
          postPagination.map((post) => (
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
