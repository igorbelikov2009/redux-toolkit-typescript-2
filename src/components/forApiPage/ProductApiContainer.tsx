import React, { FC, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { IProduct } from "../../models/types";
import { productAPI } from "../../services/ProductsService";
import PaginationButtons from "../gui/PaginationButtons";
import MySelect, { IOption } from "../gui/select/MySelect";
import ProductItem from "../items/ProductItem";

interface ProductApiContainerProps {
  topOfPage: () => void;
}

const ProductApiContainer: FC<ProductApiContainerProps> = ({ topOfPage }) => {
  //================================================================================
  // PAGINATION
  // Для пагинации нам необходимо получить общее количество products. По этому мы
  // получаем все products, но не выводим их, просто вычисляем totalCount.
  const { data: totalCountElem } = productAPI.useFetchAllPdoructsQuery();
  let totalCount: number = 0;
  if (totalCountElem) {
    totalCount = totalCountElem.length;
  }
  // Получаем limit, page по параметрам, установленным в postPaginationAPI в эндпоинте:
  //  getPhotosPagination: query: (page: number = 1, limit: number = 10)
  const [page, setPage] = useState<number>(1);
  // Здесь, limit у нас взят так же из параметров, для расчётов. Здесь мы его не можем
  // менять. В дальнейшем, limit надо будет получать из параметра запроса.
  const [limit] = useState<number>(10);
  // Вычисляем количество страниц
  let countPage: number = Math.ceil(totalCount / limit);
  // console.log(countPage);
  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  // Получаем массив products с сервера постранично

  const { data: products, error, isLoading } = productAPI.useGetProductsPaginationQuery(page);
  // PAGINATION
  //================================================================================

  const [createProduct, { error: createError }] = productAPI.useCreateProductMutation();
  const [updateProduct, { error: updateError }] = productAPI.useUpdateProductMutation();
  const [deleteProduct, { error: deleteError }] = productAPI.useDeleteProductMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название продукта") || "";
    const price = Number(prompt("Введите стоимость продукта") || "");
    const description = prompt("Введите описание продукта") || "";
    const category = prompt("Введите категорию продукта") || "";
    const image = prompt("Введите url продукта") || "";
    const rate = Number(prompt("Введите рейтинг продукта") || "");
    const count = Number(prompt("Введите количество оценок продукта") || "");

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
  //==============================
  // Сортировка
  const options: IOption[] = [
    { value: "id", name: "По номеру продукта" },
    { value: "title", name: "По названию продукта" },
    { value: "price", name: "По стоимости продукта" },
    { value: "category", name: "По категории продукта" },
    // { value: "rating.rate", name: "По рейтингу продукта" },
    // { value: "rating.count", name: "По количеству оценок продукта" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("");

  function getSortedProducts() {
    // console.log("Отработала функция getSortedPhotos");
    if (selectedSort && products) {
      // return [...products].sort((a, b) => String(a[selectedSort]).localeCompare(String(b[selectedSort])));
      return [...products].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return products;
  }

  // Получаем отсортированный массив.  В HTML, для разворачивания массива продуктов
  //  используем уже не массив products, полученный с сервера, а отсортированный массив
  // sortedProducts
  const sortedProducts = getSortedProducts();

  // Определяем выбранный в selecte метод сортировки фоток (sortPhotos) через в обработчик
  // onChangeValue={sortPhotos} и записываем его в состояние setSelectedSort(sort);
  const sortProducts = (sort: any) => {
    setSelectedSort(sort);
    // console.log(sort);
  };
  // Сортировка
  //==============================

  return (
    <Container>
      <Row>
        <div>
          <div>
            <h3 className="textCenter"> Список продуктов из productAPI.</h3>

            <div className="containerButton mt-3 mb-4">
              <Button variant="outline-info " onClick={handleTransition}>
                В начало страницы services createApi()
              </Button>

              <Button variant="outline-success mr-2 ml-2" onClick={handleCreate}>
                Добавить новый продукт
              </Button>

              <div>
                <MySelect
                  defaultValue="Сортировка"
                  disabled={true}
                  options={options}
                  value={selectedSort}
                  onChangeValue={sortProducts}
                />
              </div>
            </div>

            <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

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
            {sortedProducts &&
              sortedProducts.map((product) => (
                <ProductItem key={product.id} product={product} update={handleUpdate} remove={handleRemove} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default ProductApiContainer;
