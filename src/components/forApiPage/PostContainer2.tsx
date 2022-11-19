import React from "react";
import { IPost } from "../../models/types";
import { postAPI } from "../../services/PostService";
import PostItem from "./PostItem";
// import PostItem from "./PostItem";

const PostContainer2 = () => {
  // параметр 10 - это мы задаём значение для limit
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100);

  // eslint-disable-next-line no-empty-pattern
  const [deletePost, {}] = postAPI.useDeletePostMutation();
  // eslint-disable-next-line no-empty-pattern
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const handleRemove = (post: IPost) => {
    deletePost(post);
  };
  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <h3 className="textCenter mb-5">Список пользователей - 2</h3>

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

      {/* Добавляем проверку: если у нас есть посты, и они не undefined  */}
      <div className="post">
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />
        ))}
      </div>
    </div>
  );
};

export default PostContainer2;
