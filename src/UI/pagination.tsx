import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { PaginationProps } from "../types/types";

const Pagination = ({
  fetchData,
  next,
  prev,
  pages,
  page,
}: PaginationProps) => {
  return (
    <div className="w-10/12 mx-auto flex justify-between">
      <button
        disabled={!prev}
        onClick={() => {
          if (prev) fetchData(prev);
        }}
        className="pagination-button"
      >
        <IconChevronLeft />
        <span className="hidden sm:block">Previous</span>
      </button>
      <span className="underline underline-offset-4">
        {page}/{pages}
      </span>
      <button
        disabled={!next}
        onClick={() => {
          if (next) fetchData(next);
        }}
        className="pagination-button"
      >
        <span className="hidden sm:block">Next</span>
        <IconChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
