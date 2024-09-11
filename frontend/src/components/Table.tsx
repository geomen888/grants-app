import React from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';
import ListIsEmpty from './ListIsEmpty';

import { Grant } from '../interfaces';
import { dateFormatter, amountFormatter } from '../utils';

interface TableProps {
  grants: Grant[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    text-align: center;
  }
`;

const Table: React.FC<TableProps> = ({ grants, pageCount, currentPage, onPageChange }) => {
  return (
    <>
      <TableContainer>
        <thead>
          <tr>
            <th>Foundation name</th>
            <th>Grant name</th>
            <th>Average amount</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Match Date</th>
          </tr>
        </thead>
        <tbody>
          {grants && grants.length
           ? grants.map((grant) => (
            <tr key={grant.id}>
              <td>{grant.companyName}</td>
              <td>{grant.title}</td>
              <td>{amountFormatter.format(+grant.avgAmount)}</td>
              <td>{grant.status}</td>
              <td>{dateFormatter(grant.deadLineDate)}</td>
              <td>{dateFormatter(grant.matchDate)}</td>
            </tr>
          )):
          (<tr>
            <td colSpan={6}>
            <ListIsEmpty />
            </td>
          </tr>)
          }
        </tbody>
      </TableContainer>
      <Pagination 
      pageCount={pageCount}
      currentPage={currentPage}
      onPageChange={onPageChange} />
    </>
  );
};

export default Table;
