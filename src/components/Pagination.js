import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const disablePrev = currentPage === 1;

  const disableNext = currentPage === totalPages;

  return (
    <div className="pagination">
      <button
        disabled={disablePrev}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <button
        disabled={disableNext}
        onClick={() => onPageChange(currentPage + 1)}
      > Next
      </button>
    </div>
  );
};

export default Pagination;
