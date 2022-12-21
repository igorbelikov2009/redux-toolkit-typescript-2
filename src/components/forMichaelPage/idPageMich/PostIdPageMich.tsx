import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { fetchPostById } from "../../../store/michReducer/postMichReducer";

interface IParams {
  id?: string;
}

const PostIdPageMich: FC = () => {
  const dispatch = useAppDispanch();
  const { post } = useAppSelector((state) => state.postMichReducer);
  console.log(post);
  const { id } = useParams<IParams>();
  console.log(id);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  return (
    <div className="mt-6">
      <Card>
        <h1 className="mt-2">Вы открыли страницу поста ID = {id} </h1>

        {post.title}
      </Card>
    </div>
  );
};

export default PostIdPageMich;
