import { useState } from "react";

const usePages = (pageCount: number, startPage = 0) => {
  const [currentPage, setCurrentPage] = useState(startPage);

  const navigateToPage = (page: number) => {
    if (page > -1 && page < pageCount) setCurrentPage(page);
  };

  const flipBack = () => {
    navigateToPage(currentPage - 1);
  };

  const flipForward = () => {
    navigateToPage(currentPage + 1);
  };

  return {
    currentPage,
    navigateToPage,
    flipBack,
    flipForward,
    hasPrevPage: currentPage != 0,
    hasNextPage: currentPage != pageCount - 1,
  };
};

export default usePages;
