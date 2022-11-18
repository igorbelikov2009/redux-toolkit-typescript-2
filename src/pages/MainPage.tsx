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
            href="https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Официальный Redux Toolkit createAsyncThunk()
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://react-redux.js.org/api/hooks" target="_blank" rel="noreferrer" className="link">
            Официальный React Redux. Hooks: useSelector(), useDispatch(), useStore(), useActions().
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
          <a href="https://www.youtube.com/watch?v=sAmRtPbSEmg" target="_blank" rel="noreferrer" className="link">
            React.ts #1: Структура проекта React.js на TypeScript c Redux и Redux-Saga. #JS Code
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a
            href="https://www.youtube.com/watch?v=5s3CqW3uDgk&list=PL6nKq4UB9xc7qhrKmkf6AsCYMQi20ELFH&index=2"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            React.ts #2: Авторизация и пример работы с Redux и Redux-Saga. #JS Code
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=_j4k73zoy5Y" target="_blank" rel="noreferrer" className="link">
            Redux Toolkit. Лучший state manager 2022. Обзор. createSlice / createAsyncThunk. Давай Попробуем:
            JavaScript.
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=13Th8jv0jO0" target="_blank" rel="noreferrer" className="link">
            React Redux - Полный Практический Курс 2022 (для начинающих с нуля). Василий Муравьев
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=G3GGXIhggGs" target="_blank" rel="noreferrer" className="link">
            React Redux + Saga. Практический Курс. Владилен Минин.
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=Vzt9Re9Tbjc" target="_blank" rel="noreferrer" className="link">
            Redux-Saga. Полный курс. webDev
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=ah5voE_SGjo" target="_blank" rel="noreferrer" className="link">
            Redux-Saga React Полный Курс. Урок 1. Саги, Эффекты, Генераторы. wise.js
          </a>
        </ListGroup.Item>

        <ListGroup.Item>
          <a href="https://www.youtube.com/watch?v=7Pq-2bBIzXY" target="_blank" rel="noreferrer" className="link">
            Redux-Saga React Полный Курс. Урок 2. Эффекты в деталях. Архитектура саг. React Router + Redux Saga. wise.js
          </a>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default MainPage;
