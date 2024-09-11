import React, { useState } from 'react';
import styled from 'styled-components';

import FeedbackModal from './FeedbackModal';

import { Grant } from '../interfaces';

interface CardProps {
  grant: Grant;
  onLike: (id: string, feedback: string) => void;
  onDislike: (id: string, feedback: string) => void;
}

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  background-color: white;
  width: 17rem;
  margin: 1rem;
  &:hover {
    border-color: #0066ff;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 18px;
`;

const Amount = styled.h4`
  color: #ff6b6b;
`;

const Button = styled.button<{ $isHovered: boolean; }>`
  background-color: #ff6b6b;
  color: white;
  width: 100%;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  visibility: ${props => props.$isHovered ? 'visible' : 'hidden'};
  &:hover {
    background-color: #ff3b3b;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px;
`;

const Card: React.FC<CardProps> = ({ grant, onLike, onDislike }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(true);
    setIsFeedbackOpen(true);
  };

  const handleDislike = () => {
    setIsLiked(false);
    setIsFeedbackOpen(true);
  };

  const submitFeedback = (feedback: string) => {
    if (isLiked) {
      onLike(grant.id, feedback);
    } else {
      onDislike(grant.id, feedback);
    }
    setIsFeedbackOpen(false);
  };

  const closeModal = () => {
    setIsFeedbackOpen(false);
  };

  return (
    <>
      <CardContainer onMouseEnter={() => {
        setHovered(true);
      }}
        onMouseLeave={() => setHovered(false)}>
        <CardHeader>
          <Title>{grant.title}</Title>
          <div>
            <ActionButton onClick={handleLike}>👍</ActionButton>
            <ActionButton onClick={handleDislike}>👎</ActionButton>
          </div>
        </CardHeader>
        <Amount>{grant.avgAmount}</Amount>
        <Button $isHovered={isHovered}>Apply here</Button>
      </CardContainer>
      {isFeedbackOpen && <FeedbackModal onSubmit={submitFeedback} onClose={closeModal} />}
    </>
  );
};

export default Card;