import React, { FC, useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchTodos } from "../../store/reducers/ActionCreater";

const TodoSliceContainer: FC = () => {
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
              <Card className="post" key={todo.id}>
                <div className="cardBlock">
                  <div className="cardDescription">
                    <Card.Title>
                      <i> дело № </i> <b> {todo.id} </b>
                    </Card.Title>

                    <i className="displayBlock">
                      <i> описание дела: </i> <b> {todo.title} </b>
                    </i>

                    <i className="displayBlock">
                      <span className={todo.completed ? "colorBlue textLine" : "colorRed"}>
                        {todo.completed ? "Выполнено" : "Не выполнено"}
                      </span>
                    </i>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoSliceContainer;
