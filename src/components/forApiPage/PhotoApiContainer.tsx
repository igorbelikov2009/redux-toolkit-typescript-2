import React, { FC, useState } from "react";
import { photoAPI } from "../../services/PhotoService";
import { Container, Row, Button } from "react-bootstrap";
import { IPhoto } from "../../models/types";
import PhotoItemApi from "../items/PhotoItemApi";
import MySelect, { IOption } from "../gui/select/MySelect";
import PaginationButtons from "../gui/PaginationButtons";

interface PhotoApiContainerProps {
  topOfPage: () => void;
}

const PhotoApiContainer: FC<PhotoApiContainerProps> = ({ topOfPage }) => {
  //================================================================================
  // PAGINATION
  // Для пагинации нам необходимо получить общее количество photo. По этому мы
  // получаем все photo, но не выводим их, просто вычисляем totalCount.
  const { data: totalCountElem } = photoAPI.useFetchAllPhotosQuery();
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
  // Получаем массив фоток с сервера постранично
  const { data: photos, isLoading, error } = photoAPI.useGetPhotosPaginationQuery(page);
  // PAGINATION
  //================================================================================

  const [createPhoto, { isError: createIsError }] = photoAPI.useCreatePhotoMutation();
  const [updatePhoto, { isError: updateError }] = photoAPI.useUpdatePhotoMutation();
  const [deletePhoto, { error: deleteError }] = photoAPI.useDeletePhotoMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название фото") || "";
    const url = prompt("Введите url фото") || "";
    const thumbnailUrl = prompt("Введите thumbnailUrl фото") || "";
    await createPhoto({ title, url, thumbnailUrl } as IPhoto);
  };

  const handleUpdate = (photo: IPhoto) => {
    updatePhoto(photo);
  };

  const handleRemove = (photo: IPhoto) => {
    deletePhoto(photo);
  };

  const handleTransition = () => {
    topOfPage();
  };

  //==============================
  // Сортировка
  // options for MySelect: options={options}
  const options: IOption[] = [
    { value: "id", name: "По номеру фото" },
    { value: "title", name: "По названию фото" },
    { value: "url", name: "По URL фото" },
    { value: "thumbnailUrl", name: "По URL эскиза" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("");

  function getSortedPhotos() {
    // console.log("Отработала функция getSortedPhotos");
    if (selectedSort && photos) {
      return [...photos].sort((a, b) => String(a[selectedSort]).localeCompare(String(b[selectedSort])));
    }
    return photos;
  }
  // Получаем отсортированный массив фоток: sortedPhotos. В HTML, для разворачивания массива фоток,
  // используем уже не массив photos, полученный с сервера, а отсортированный массив: sortedPhotos.
  const sortedPhotos = getSortedPhotos();

  const sortPhotos = (sort: any) => {
    setSelectedSort(sort);
    // console.log(sort);
    // for MySelect: onChangeValue={sortPhotos}
  };
  //==============================

  return (
    <Container className="card">
      <Row>
        <div>
          <h3 className="textCenter">Список фоток из photoAPI</h3>

          <div className="containerButton mt-1 mb-4 ">
            <Button variant="outline-info" onClick={handleTransition}>
              В начало страницы services createApi()
            </Button>

            <Button variant="outline-success mr-2 ml-2" onClick={handleCreate}>
              Добавить новое фото
            </Button>

            <MySelect
              defaultValue="Сортировка"
              disabled={true}
              options={options}
              value={selectedSort}
              onChangeValue={sortPhotos}
            />
          </div>

          <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

          <div> {isLoading && <h1> Идёт загрузка</h1>} </div>

          <div>
            <>
              {error && (
                <h1>
                  <> Произошла ошибка при загрузке. </>
                </h1>
              )}
              {createIsError && (
                <h1>
                  <> Произошла ошибка при создании. </>
                </h1>
              )}
              {updateError && (
                <h1>
                  <> Произошла ошибка при обновлении. </>
                </h1>
              )}
              {deleteError && (
                <h1>
                  <> Произошла ошибка при удалении. </>
                </h1>
              )}
            </>
          </div>
        </div>

        {/* Добавляем проверку: если у нас есть photos, и они не undefined  */}
        <div className="post">
          {sortedPhotos &&
            sortedPhotos.map((photo) => (
              <PhotoItemApi key={photo.id} photo={photo} update={handleUpdate} remove={handleRemove} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default PhotoApiContainer;
