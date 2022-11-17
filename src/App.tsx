import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";

// import PostContainer from "./components/PostContainer";
// import PostContainer2 from "./components/PostContainer2";
import TodoContainer from "./components/TodoContainer";
import AsyncThunkSlicePage from "./pages/AsyncThunkSlicePage";
import SlicePage from "./pages/SlicePage";
// import CounterPage from "./pages/CounterPage";

function App() {
  return (
    <div>
      <NavBar />
      <AsyncThunkSlicePage />
      {/* <CounterPage /> */}
      <SlicePage />

      <Container>
        {/* <Row>
          <Col md={6}>
            <PostContainer />
          </Col>

          <Col md={6}>
            <PostContainer2 />
          </Col>
        </Row> */}

        <Row>
          <Col md={12}></Col>

          <TodoContainer />
        </Row>
      </Container>
    </div>
  );
}

export default App;
