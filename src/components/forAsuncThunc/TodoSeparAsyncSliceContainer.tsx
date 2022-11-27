import React, { FC, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { addNewTodo, fetchTodosSepar } from "../../store/todoSeparSlice";
import TodoSeparItem from "../items/TodoSeparItem";
import NewTodoForm from "./NewTodoForm";

const TodoSeparAsyncSliceContainer: FC = () => {
  const [text, setText] = useState("");

  const dispatch = useAppDispanch();
  const { todos, status, error } = useAppSelector((state) => state.todoSeparReducer);
  // console.log(todos, status, error);

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodosSepar());
  }, [dispatch]);

  return (
    <Container>
      <div className="containerButton ">
        <NewTodoForm value={text} updateText={setText} handleAction={handleAction} />
      </div>

      <Row>
        <div>
          <h2 className="textCenter mb-4">Список дел пользователя из todoSeparReducer</h2>

          <div>
            {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

            <div>{error && <h1 className="textCenter"> {error} </h1>}</div>

            <div>
              {todos?.map((todo) => (
                // <TodoSeparItem key={todo.id} todo={todo} remove={handleRemove} update={handleUpdate} />
                <TodoSeparItem
                  key={todo.id}
                  completed={todo.completed}
                  id={todo.id}
                  title={todo.title}
                  userId={todo.userId}
                />
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoSeparAsyncSliceContainer;
