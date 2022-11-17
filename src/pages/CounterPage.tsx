import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAppDispanch, useAppSelector } from "../hooks/redux";
import { counterSlice } from "../store/reducers/CounterSlice";

const CounterPage: FC = () => {
  // Слайс содержит в себе экшенкреаторы и reducers. Соответственно,
  // экшенкреаторы мы можем вытащить вот таким образом
  const { decrement, increment, multiplication, divide } = counterSlice.actions;
  //   console.log(counterSlice.name, counterSlice.actions);
  // То есть ни экшены, ни экшенкреаторы, ни типы для них, мы не создаём вручную.
  // За нас всё это делает redux-toolkit. Нам остаётся, созданный с помощью
  // redux-toolkitа экшенкреатер, только задиспачить.

  // А сам счётчик, мы получаем с помощью хука useAppSelector().
  // С помощью деструктуризации достаём нужное нам поле.
  const { count } = useAppSelector((state) => state.counterReducer);
  // console.log(count);
  // Ну и диспатч через типизированный хук
  const dispatch = useAppDispanch();

  return (
    <Container className="mt-6 mb-4">
      <h1 className="textCenter mb-4">Изменение state в редюсере redux-toolkit counterSlice</h1>
      <h2 className="textCenter mb-5">Значение счётчика: {count}</h2>
      <Row className="mt-4">
        <Col md={3}>
          <Button onClick={() => dispatch(increment(5))} variant="primary">
            INCREMENT++
          </Button>
        </Col>
        <Col md={3}>
          <Button onClick={() => dispatch(decrement(5))} variant="success">
            DECREMENT--
          </Button>
        </Col>
        <Col md={3}>
          <Button onClick={() => dispatch(multiplication(5))} variant="warning">
            УМНОЖИТЬ
          </Button>
        </Col>
        <Col md={3}>
          <Button onClick={() => dispatch(divide(5))} variant="danger">
            Разделить
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CounterPage;
