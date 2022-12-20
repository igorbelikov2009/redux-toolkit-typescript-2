import React, { FC } from "react";
import { Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RoutesBlock from "../gui/RoutesBlock";

const ProductsMichContainer: FC = () => {
  const history = useHistory();
  const location = history.location.pathname;

  return (
    <div>
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock">
        <div className="card mt-5">
          <Row>ProductsMichContainer</Row>
        </div>
      </div>
    </div>
  );
};

export default ProductsMichContainer;
