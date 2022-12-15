import React, { FC } from "react";
import Form from "react-bootstrap/Form";
import { IFilter } from "../models/types";
import MySelect, { IOption } from "./gui/select/MySelect";

interface SortFilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<
    React.SetStateAction<{
      sort: string;
      query: string;
    }>
  >;
  options: IOption[];
  placeholder: string;
}

const SortFilter: FC<SortFilterProps> = ({ filter, setFilter, options, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
  };

  return (
    <div className="card">
      <h6>Это компонент SortFilter.tsx, объединяющий поиск и сортировку.</h6>
      <Form.Control
        className="mb-2"
        value={filter.query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />

      <MySelect
        defaultValue="Сортировка"
        disabled={true}
        value={filter.sort}
        onChangeValue={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
        options={options}
      />
    </div>
  );
};

export default SortFilter;
