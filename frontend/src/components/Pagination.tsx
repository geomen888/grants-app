import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  .pagination {
    display: flex;
    list-style: none;
    gap: 10px;
  }

  .pagination li {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .pagination .active {
    background-color: #0066ff;
    color: white;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <PaginationWrapper>
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={(data) => onPageChange(data.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </PaginationWrapper>
  );
};

export default Pagination;
