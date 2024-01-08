import { Types } from "modules/movie";
import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  movies: Types.IEntity.Movie[];
  pagination: number;
  onNext: (index: number) => void;
  handlePrev: () => void;
  handleNext: (pagination: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  movies,
  pagination,
  onNext,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={handlePrev}>
              Previous
            </button>
          </li>
          {[...Array(Math.ceil(movies.length / itemsPerPage))].map(
            (item, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 && "active"}`}
              >
                <button
                  className="page-link"
                  onClick={() => onNext(index)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handleNext(pagination)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
