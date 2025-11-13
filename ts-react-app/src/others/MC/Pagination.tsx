import { useState, type ChangeEvent } from "react";
import "../styles/Pagination.css";

type PaginationDetailsState = {
  totalItams: number;
  itemsPerPage: number;
  currentPage: number;
};
type PaginationProps = {
  paginationDetails: PaginationDetailsState;
  onPageChange: (page: number) => void;
};

const Pagination = ({ paginationDetails, onPageChange }: PaginationProps) => {
  const { totalItams, itemsPerPage, currentPage } = paginationDetails;
  const totalPages = Math.ceil(totalItams / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <button
        className="btn pg-btn"
        disabled={currentPage <= 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        prev
      </button>
      {pageNumbers.map((page) => (
        <button
          className={`btn ${currentPage === page && "active-btn"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="btn pg-btn"
        disabled={currentPage >= totalPages}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        next
      </button>
    </div>
  );
};

const PaginationDemo = () => {
  const [paginationDetails, setPaginationDetails] =
    useState<PaginationDetailsState>({
      totalItams: 150,
      itemsPerPage: 15,
      currentPage: 1,
    });
  const [isEditingEnabled, setIsEditingEnabled] = useState({
    totalItams: false,
    itemsPerPage: false,
  });
  const handlePageChange = (page: number) => {
    setPaginationDetails((prev) => ({ ...prev, currentPage: page }));
  };

  const handleEditSubmit = (value: string) => {
    if (value === "totalItems") {
      setIsEditingEnabled((prev) => ({
        ...prev,
        totalItams: !isEditingEnabled.totalItams,
      }));
    } else if (value === "itemsPerPage") {
      setIsEditingEnabled((prev) => ({
        ...prev,
        itemsPerPage: !isEditingEnabled.itemsPerPage,
      }));
    }
  };

  const items = Array.from(
    { length: paginationDetails.totalItams },
    (_, i) => i + 1
  );

  const startIndex =
    (paginationDetails.currentPage - 1) * paginationDetails.itemsPerPage;
  const endIndex = paginationDetails.itemsPerPage + startIndex;

  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div>
      <div className="pagination-details">
        <p>Total Items:</p>
        {isEditingEnabled.totalItams ? (
          <input
            value={paginationDetails.totalItams}
            onBlur={() => handleEditSubmit("totalItems")}
            onKeyDown={(e) =>
              e.key == "Enter" && handleEditSubmit("totalItems")
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPaginationDetails((prev) => ({
                ...prev,
                totalItams: Number(e.target.value),
              }))
            }
          />
        ) : (
          <label
            onDoubleClick={() =>
              setIsEditingEnabled((prev) => ({
                ...prev,
                totalItams: !isEditingEnabled.totalItams,
              }))
            }
          >
            {paginationDetails.totalItams}
          </label>
        )}
        <p>Items per Page:</p>
        {isEditingEnabled.itemsPerPage ? (
          <input
            value={paginationDetails.itemsPerPage}
            onBlur={() => handleEditSubmit("itemsPerPage")}
            onKeyDown={(e) =>
              e.key == "Enter" && handleEditSubmit("itemsPerPage")
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPaginationDetails((prev) => ({
                ...prev,
                itemsPerPage: Number(e.target.value),
              }))
            }
          />
        ) : (
          <label
            onDoubleClick={() =>
              setIsEditingEnabled((prev) => ({
                ...prev,
                itemsPerPage: !isEditingEnabled.itemsPerPage,
              }))
            }
          >
            {paginationDetails.itemsPerPage}
          </label>
        )}
      </div>
      <h1>List Items</h1>
      <div className="items">
        <ul className="list-item">
          {currentItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <Pagination
          paginationDetails={paginationDetails}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PaginationDemo;
