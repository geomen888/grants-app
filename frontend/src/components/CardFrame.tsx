import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Pagination from './Pagination';
import ListIsEmpty from './ListIsEmpty';

import { Grant } from '../interfaces';

interface CardFrameProps {
  grants: Grant[];
  onLike: (id: string, feedback: string) => void;
  onDislike: (id: string, feedback: string) => void;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 2rem;
`;



const CardFrame: React.FC<CardFrameProps> = ({ grants = [], onLike, onDislike, pageCount, onPageChange }) => {
  return (
    <>
      {grants && grants.length ? <GridContainer>
        {
          grants.map((grant) => (
            <Card key={grant.id} grant={grant} onLike={onLike} onDislike={onDislike} />
          ))
        }
      </GridContainer>
        : <ListIsEmpty />}
      <Pagination pageCount={pageCount} onPageChange={onPageChange} />
    </>
  );
};

export default CardFrame;
