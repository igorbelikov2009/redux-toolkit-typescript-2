import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchTodos } from "../../store/reducers/ActionCreater";
import TodoItem from "../items/TodoItem";

const TodoSliceContainer: FC = () => {
  //
  const dispatch = useAppDispanch();
  const { todos, isLoading, error } = useAppSelector((state) => state.todoReducer);

  useEffect(() => {
    dispatch(fetchTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список дел пользователей из todoReducer</h2>
          {isLoading && <h1> Идёт загрузка</h1>}
          <div>
            <>
              {error && (
                <h1>
                  <> {error} </>
                </h1>
              )}
            </>
          </div>

          <div>
            {todos?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoSliceContainer;
