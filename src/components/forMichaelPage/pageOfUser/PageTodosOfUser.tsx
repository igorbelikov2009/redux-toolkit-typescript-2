import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { getUsersTodos } from "../../../store/michReducer/usersMichReducer";
import { toggledStatusMich } from "../../../store/michReducer/todoMichReducer";

interface IDParams {
  id: string;
}

const PageTodosOfUser: FC = () => {
  const { id } = useParams<IDParams>();
  // console.log(id);
  const dispatch = useAppDispanch();
  const history = useHistory();
  const { todos, error } = useAppSelector((state) => state.usersMichReducer);
  // console.log(todos);

  useEffect(() => {
    dispatch(getUsersTodos(id));
  }, [dispatch, id]);

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h3 className="colorRed"> {error} </h3>
        ) : (
          <div>
            <div className="flexColumn">
              <h1>Вы открыли страницу со списком дел пользователя {id} </h1>

              <div className="displayFlex mt-2 mb-2">
                <Button
                  variant="outline-success"
                  className="mAuto"
                  onClick={() => history.push(`/michael/users/${id}`)}
                >
                  На страницу пользователя
                </Button>
              </div>
            </div>

            {todos &&
              todos.map((todo) => (
                <Card className="post" key={todo.id}>
                  <div className="cardBlock">
                    <div className="cardDescription">
                      <Card.Title>
                        <i> пользователь № </i> <b> {todo.userId} </b>
                      </Card.Title>

                      <i className="displayBlock">
                        <i> дело № </i> <b> {todo.id} </b>
                      </i>

                      <i className="displayBlock">
                        <i> описание дела: </i> <b> {todo.title} </b>
                      </i>

                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggledStatusMich(todo.id))}
                      />

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
        )}
      </div>
    </Card>
  );
};

export default PageTodosOfUser;
