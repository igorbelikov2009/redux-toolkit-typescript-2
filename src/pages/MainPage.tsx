import React, { FC } from "react";
import { Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const MainPage: FC = () => {
  return (
    <Container className="mt-6">
      <Row>
        <h1 className="textCenter">Redux Toolkit Typescript</h1>
      </Row>

      <ListGroup>
        <ListGroup.Item>
          <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer" className="link">
            Официальный Redux Toolkit
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a
            href="https://www.youtube.com/watch?v=Od5H_CiU2vM&t=287s"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Продвинутый Redux. Redux Toolkit, RTK query, TypeScript. Ulbi TV.
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=lkbm-zlcFvs" target="_blank" rel="noreferrer" className="link">
            React стек 2022. TypeScript, Redux Toolkit, RTKQuery, Tailwind. Владилен Минин.
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=6RTbC8Acj1M" target="_blank" rel="noreferrer" className="link">
            Асинхронная работа с Redux Toolkit и createAsyncThunk. Михаил Непомнящий.
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=_j4k73zoy5Y" target="_blank" rel="noreferrer" className="link">
            Redux Toolkit. Лучший state manager 2022. Обзор. createSlice / createAsyncThunk. Давай Попробуем:
            JavaScript.
          </a>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default MainPage;
