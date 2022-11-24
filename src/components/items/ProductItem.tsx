import React, { FC, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { IProduct } from "../../models/types";

interface ProductItemProps {
  product: IProduct;
  update: (product: IProduct) => void;
  remove: (product: IProduct) => void;
}

const ProductItem: FC<ProductItemProps> = ({ product, update, remove }) => {
  const [details, setDetails] = useState<boolean>(false);

  const showHideDetails: () => void = () => {
    setDetails((prev) => !prev);
  };
  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt("Введите название продукта") || "";
    const price = prompt("Введите стоимость продукта") || "";
    const description = prompt("Введите описание продукта") || "";
    const category = prompt("Введите категорию продукта") || "";
    const image = prompt("Введите url продукта") || "";
    const rate = prompt("Введите рейтинг продукта") || "";
    const count = prompt("Введите количество оценок продукта") || "";
    update({ ...product, title, price, description, category, image, rating: { rate, count } });
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(product);
  };

  //  onClick={handleUpdate}
  return (
    <Card className="card">
      <Card.Title>
        <b> Название: </b> {product.title}
      </Card.Title>

      <i className="displayBlock">
        <b> Стоимость: </b> от {product.price} РУБ;
      </i>

      {details && (
        <i className="displayBlock">
          <b> Описание: </b> {product.description};
        </i>
      )}

      <i className="displayBlock">
        <b> Категория: </b> {product.category};
      </i>

      <div className="containerImageProduct card">
        <img className="sizeImgProduct mb-3" src={product.image} alt="product" />
        {/* <i className="displayBlock">
          <b> url: </b> {product.image};
        </i> */}
      </div>

      <div className="containerButton">
        <Button onClick={showHideDetails} variant={details ? "success" : "warning"}>
          {details ? "Спрятать детали" : "Показать детали "}
        </Button>
      </div>

      <div className="card">
        <i className="displayBlock">
          <b> Рейтинг: </b> {product.rating.rate};
        </i>

        <i className="displayBlock">
          <b> Количество оценок: </b> {product.rating.count};
        </i>
      </div>

      <div className="cardButton">
        <Button onClick={handleRemove} variant="outline-primary">
          Удалить
        </Button>

        <Button onClick={handleUpdate} variant="outline-warning ml-2">
          Обновить
        </Button>
      </div>
    </Card>
  );
};

export default ProductItem;
