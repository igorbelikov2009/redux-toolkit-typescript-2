import React, { FC, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { addTodoMich, fetchTodosMich } from "../../store/michReducer/todoMichReducer";
import NewTodoForm from "../forAsuncThunc/NewTodoForm";
import RoutesBlock from "../gui/RoutesBlock";
import TodoMichItem from "./itemMich/TodoMichItem";

const TodosMichContainer: FC = () => {
  const history = useHistory();
  const location = history.location.pathname;
  const [text, setText] = useState<string>("");

  const dispatch = useAppDispanch();
  const { todos, status, error } = useAppSelector((state) => state.todoMichReducer);
  // console.log(todos, status, error);

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addTodoMich(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodosMich());
  }, [dispatch]);

  return (
    <div>
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock">
        <div className="card mt-5">
          <div className="containerButton ">
            <NewTodoForm value={text} updateText={setText} handleAction={handleAction} />
          </div>
          <Row>
            <div>
              <h2 className="textCenter mb-4">Список дел пользователя из todoMichReducer</h2>

              <div>
                {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

                <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
              </div>

              <div>{todos && todos.map((todo) => <TodoMichItem key={todo.id} todo={todo} />)}</div>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TodosMichContainer;
