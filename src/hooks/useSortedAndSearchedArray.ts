import { useMemo } from "react";

// Параметрами принимает массив с данными и метод сортировки,
// возвращает отсортированный массив.
export const useSortedArray = (arrayData: any[], sort: string) => {
  const sortedArray = useMemo(() => {
    if (sort) {
      return [...arrayData].sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    }
    return arrayData;
  }, [arrayData, sort]);
  return sortedArray;
};

type IUseSortedAndSearchedArray = (arrayData: any[], sort: string, query: string) => any[];

// Отсортированный и отфильтрованный массив:
export const useSortedAndSearchedArray: IUseSortedAndSearchedArray = (
  arrayData: any[],
  sort: string,
  query: string
) => {
  const sortedArray = useSortedArray(arrayData, sort);
  const sortedAndSearchedArray = useMemo(() => {
    return sortedArray.filter((obj) => {
      return obj.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, sortedArray]);
  return sortedAndSearchedArray;
};

// как сделать хук многосторонним obj.title либо obj.name, когда у объекта нет поля title,
// а есть name
