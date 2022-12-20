import React, { FC } from "react";
import { Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RoutesBlock from "../components/gui/RoutesBlock";

const MichaelPage: FC = () => {
  const history = useHistory();
  const location = history.location.pathname;

  return (
    <div className="displayFlex">
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock">
        <div className="card mt-6">
          <Row>
            <h2 className="textCenter mb-4"> Используем createSlice() и createAsyncThunk() </h2>
          </Row>

          <Row>
            <h4 className="textCenter mb-4">
              Используем сайт
              <a className="link ml-1" href="https://jsonplaceholder.typicode.com/" target={"_blank"} rel="noreferrer">
                JSON Placeholder
              </a>
            </h4>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MichaelPage;
