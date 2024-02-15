import { useContext } from "react";
import { userContext } from "../context/userContext";

export const Paginate = ({ currentPage, setCurrentPage, totalPages }) => {
  const { userState } = useContext(userContext);
  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxPagesToShow = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesToShow) {
      const middlePage = Math.floor(maxPagesToShow / 2);
      startPage = Math.max(currentPage - middlePage, 1);
      endPage = Math.min(currentPage + middlePage, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`cursor-pointer relative z-10  items-center border m-1  ${
            i === currentPage ? "bg-indigo-600" : "text-indigo-400"
          } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          {i}
        </button>
      );
    }
    return paginationItems;
  };

  return (
    <div className="mt-2">
      <button
        disabled={currentPage <= 1 ? true : false}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-[8px]  text-gray-400 mr-2  hover:bg-gray-50 `}
      >
        ◀️
      </button>
      {renderPaginationItems()}
      <button
        disabled={currentPage >= totalPages ? true : false}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-[8px]  text-gray-400 ml-2  hover:bg-gray-50 `}
      >
        ▶️
      </button>
    </div>
  );
};
