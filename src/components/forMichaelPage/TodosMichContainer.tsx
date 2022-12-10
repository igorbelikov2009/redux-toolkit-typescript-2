import React, { FC, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { addTodoMich, fetchTodosMich } from "../../store/michReducer/todoMichReducer";
import NewTodoForm from "../forAsuncThunc/NewTodoForm";
import TodoMichItem from "./itemMich/TodoMichItem";

const TodosMichContainer: FC = () => {
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
    <Container>
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

          <div>
            {todos &&
              todos.map((todo) => (
                <TodoMichItem
                  key={todo.id}
                  completed={todo.completed}
                  id={todo.id}
                  title={todo.title}
                  userId={todo.userId}
                />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodosMichContainer;
