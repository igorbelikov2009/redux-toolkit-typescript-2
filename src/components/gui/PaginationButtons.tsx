import React, { FC } from "react";
import { Button } from "react-bootstrap";

interface PaginationButtonsProps {
  page: number;
  pages: number[];
  countPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationButtons: FC<PaginationButtonsProps> = ({ page, pages, countPage, setPage }) => {
  const handleIncrement: () => void = () => {
    if (page < countPage) {
      setPage(page + 1);
    }
  };

  const handleDecrement: () => void = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="containerButton  mb-2">
        <Button variant="outline-primary" onClick={handleDecrement}>
          Prev page
        </Button>

        <div className="displayFlex">
          {pages.map((p) => (
            <Button variant="outline-primary" onClick={() => setPage(p)} active={p === page} key={p}>
              {p}
            </Button>
          ))}
        </div>

        <Button variant="outline-primary" onClick={handleIncrement}>
          Next page
        </Button>
      </div>
    </>
  );
};

export default PaginationButtons;
