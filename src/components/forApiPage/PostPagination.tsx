import React, { useState, FC } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { postPaginationAPI } from "../../services/PostApiService";

const PostList: FC = () => {
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const { data: posts } = postPaginationAPI.useListPostsQuery(page);

  let totalCountPosts;
  let countPage;

  if (posts) {
    totalCountPosts = posts.length;
    // countPage = totalCountPosts / limit;
  }
  console.log(totalCountPosts, countPage, page);

  const handleIncrement: () => void = () => {
    if (page < 10) {
      setPage(page + 1);
    }
    console.log(page);
  };

  const handleDecrement: () => void = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    console.log(page);
  };

  return (
    <Container>
      <Row className="card">
        <div className="containerButton  mb-2">
          <Button className=" mr-1" variant="outline-primary" onClick={handleDecrement}>
            Prev page
          </Button>

          <Button variant="outline-primary" onClick={handleIncrement}>
            Next page
          </Button>
        </div>

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
