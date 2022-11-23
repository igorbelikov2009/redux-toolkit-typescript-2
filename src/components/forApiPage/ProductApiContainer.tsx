import React, { FC } from "react";
import { Container, Row } from "react-bootstrap";
import { productAPI } from "../../services/ProductsService";

const ProductApiContainer: FC = () => {
  const { data: products, error, isLoading } = productAPI.useFetchAllProductsQuery(10);

  return (
    <Container>
      <Row>
        <div>
          <div>
            <h3 className="textCenter"> Список продуктов из productAPI.</h3>

            <div> {isLoading && <h1> Идёт загрузка </h1>} </div>
            <div>
              {error && (
                <h1>
                  <> {error} </>
                </h1>
              )}
            </div>
          </div>

          <div className="card">
            {products && products.map((product) => <div key={product.id}> {product.title} </div>)}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default ProductApiContainer;
