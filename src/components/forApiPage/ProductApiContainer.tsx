import React, { FC } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { IProduct } from "../../models/types";
import { productAPI } from "../../services/ProductsService";
import ProductItem from "../items/ProductItem";

interface ProductApiContainerProps {
  topOfPage: () => void;
}

const ProductApiContainer: FC<ProductApiContainerProps> = ({ topOfPage }) => {
  const { data: products, error, isLoading } = productAPI.useFetchAllProductsQuery(30);
  const [createProduct, { error: createError }] = productAPI.useCreateProductMutation();
  const [updateProduct, { error: updateError }] = productAPI.useUpdateProductMutation();
  const [deleteProduct, { error: deleteError }] = productAPI.useDeleteProductMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название продукта") || "";
    const price = prompt("Введите стоимость продукта") || "";
    const description = prompt("Введите описание продукта") || "";
    const category = prompt("Введите категорию продукта") || "";
    const image = prompt("Введите url продукта") || "";
    const rate = prompt("Введите рейтинг продукта") || "";
    const count = prompt("Введите количество оценок продукта") || "";

    await createProduct({ title, price, description, category, image, rating: { rate, count } } as unknown as IProduct);
  };

  const handleUpdate = (product: IProduct) => {
    updateProduct(product);
  };
  const handleRemove = (product: IProduct) => {
    deleteProduct(product);
  };

  const handleTransition = () => {
    topOfPage();
  };

  return (
    <Container>
      <Row>
        <div>
          <div>
            <h3 className="textCenter"> Список продуктов из productAPI.</h3>

            <div className="containerButton">
              <Button variant="outline-info mr-4 mb-4" onClick={handleTransition}>
                В начало страницы services createApi()
              </Button>

              <Button variant="outline-success mb-4" onClick={handleCreate}>
                Добавить новый продукт
              </Button>
            </div>

            <div> {isLoading && <h1 className="textCenter"> Идёт загрузка </h1>} </div>
            <div>
              {error && (
                <>
                  <h1 className="textCenter">Ошибка при загрузке</h1>
                </>
              )}
              {createError && (
                <>
                  <h1 className="textCenter">Ошибка при создании</h1>
                </>
              )}
              {updateError && (
                <>
                  <h1 className="textCenter">Ошибка при обновлении</h1>
                </>
              )}
              {deleteError && (
                <>
                  <h1 className="textCenter">Ошибка при удалении</h1>
                </>
              )}
            </div>
          </div>

          <div className="card">
            {products &&
              products.map((product) => (
                <ProductItem key={product.id} product={product} update={handleUpdate} remove={handleRemove} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default ProductApiContainer;
