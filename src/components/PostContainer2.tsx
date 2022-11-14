import React from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer2 = () => {
  // параметр 10 - это мы задаём значение для limit
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(10);

  return (
    <div>
      {isLoading && <h1> Идёт загрузка</h1>}
      <div>
        <>
          {error && (
            <h1>
              <> Произошла ошибка при загрузке. </>
            </h1>
          )}
        </>
      </div>

      {/* Добавляем проверку: если у нас есть посты, и оне не undefined  */}
      <div className="post">{posts && posts.map((post) => <PostItem key={post.id} post={post} />)}</div>
    </div>
  );
};

export default PostContainer2;
