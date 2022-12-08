import React, { FC } from "react";
import Form from "react-bootstrap/Form";

interface InputSearchProps {
  searchQuery: string;
  placeholder: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch: FC<InputSearchProps> = ({ searchQuery, placeholder, setSearchQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Form.Control
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
    </>
  );
};

export default InputSearch;
