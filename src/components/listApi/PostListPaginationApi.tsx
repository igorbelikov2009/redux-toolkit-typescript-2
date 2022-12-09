import React, { FC } from "react";
import { IPost } from "../../models/types";
import PostPaginationItem from "../items/PostPaginationItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface PostListPaginationApiProps {
  posts: IPost[];
  remove: (post: IPost) => void;
  title: string;
}

const PostListPaginationApi: FC<PostListPaginationApiProps> = ({ posts, remove, title }) => {
  return (
    <div>
      {posts.length === 0 && <h1 className="textCenter">Посты не найдены</h1>}

      <h1 className="textCenter">{title}</h1>
      <TransitionGroup>
        {posts &&
          posts.map((post) => (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostPaginationItem post={post} remove={remove} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default PostListPaginationApi;
