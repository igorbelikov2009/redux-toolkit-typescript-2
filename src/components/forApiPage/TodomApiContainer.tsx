import React, { FC, useState } from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ITodom } from "../../models/types";
import { todomAPI, useGetAllTodomsQuery } from "../../services/TodomService";
import TodomItem from "../items/TodomItem";

interface TodomApiContainerProps {
  topOfPage: () => void;
}

const TodomApiContainer: FC<TodomApiContainerProps> = ({ topOfPage }) => {
  const [limit, setLimit] = useState<number | string>(25);
  const [newTitle, setNewTitle] = useState<string>("");

  // const { data: todoms, isLoading, error } = todomAPI.useGetAllTodomsQuery(limit);
  // Верхний и нижний способы исползования хука одинаковый. Но в верху легче достать (выбрать)
  // сам хук из todomApi- приложения.
  const { data: todoms, isLoading, error } = useGetAllTodomsQuery(limit);
  const [addTodom, { error: addTodomError }] = todomAPI.useAddTodomMutation();
  const [deleteTodom, { error: deleteError }] = todomAPI.useDeleteTodomMutation();

  const handleRemove = (todom: ITodom) => {
    deleteTodom(todom);
  };

  const handleUpdate = () => {};

  const handleAddTodom = async () => {
    if (newTitle) {
      await addTodom({
        // у нового todom название (title) будет соответстовать тому, что пользователь вбил.
        // id автоматически выберет себе нужное значение, на единицу больше последнего id.
        title: newTitle,
        userId: 1,
        id: 0,
        completed: false,
      }).unwrap();
      setNewTitle("");
    }
  };
  // .unwrap() обеспечивает нам корректную работу всех дополнительных пропов, которые
  // мы можем доставать из хуков при деструктуризации, как ниже error:
  // const [addTodom, { error: addTodomError }] = todomAPI.useAddTodomMutation();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value);
  };

  const handleTransition = () => {
    topOfPage();
  };

  return (
    <Container className="post card">
      <div className="containerButton mb-4">
        <Form className="card mr-2">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Card.Title className="mb-2">Создать новый todom</Card.Title>

            <Form.Control
              className="mb-2"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Введите название нового todom"
            />
            <Button variant="outline-success" onClick={handleAddTodom}>
              Добавить новый todom
            </Button>
          </Form.Group>
        </Form>

        <Form className="card ml-2">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Card.Title className="textCenter">Сколько дел показывать на странице?</Card.Title>
            <div>
              <Form.Select
                value={limit}
                onChange={handleSelect}
                className="mySelect mr-4"
                aria-label="Default select example"
              >
                <option value="">Все</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Form.Select>
            </div>
          </Form.Group>
        </Form>
      </div>

      <div className="containerButton">
        <Button variant="outline-info mr-4 mb-4" onClick={handleTransition}>
          На страницу createApi()
        </Button>
      </div>

      <Row>
        <div>
          <h3 className="textCenter">Список todoms из todomAPI</h3>

          <div>{isLoading && <h1> Идёт загрузка...</h1>} </div>

          <div>
            {error && (
              <h1>
                <> Произошла ошибка при загрузке. </>
              </h1>
            )}
            {addTodomError && (
              <h1>
                <> Произошла ошибка при создании нового объекта. </>
              </h1>
            )}
            {deleteError && (
              <h1>
                <> Произошла ошибка при удалении. </>
              </h1>
            )}
          </div>

          {todoms &&
            todoms.map((todom) => (
              <TodomItem key={todom.id} todom={todom} remove={handleRemove} update={handleUpdate} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default TodomApiContainer;
