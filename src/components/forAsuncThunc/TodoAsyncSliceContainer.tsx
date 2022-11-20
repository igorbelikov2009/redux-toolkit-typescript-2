import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAsyncThunkTodos } from "../../store/reducers/ActionCreater";
import TodoItem from "../items/TodoItem";

const TodoAsyncSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { todos, isLoading, error } = useAppSelector((state) => state.todoAsyncThunkReducer);

  useEffect(() => {
    dispatch(fetchAsyncThunkTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список дел пользователя из todoAsyncThunkReducer</h2>

          <div>
            {isLoading && <h1>Идёт загрузка</h1>}

            <div>{error && <h1> {error} </h1>}</div>

            <div>
              {todos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoAsyncSliceContainer;
