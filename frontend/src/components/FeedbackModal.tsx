import React, { useState } from 'react';
import styled from 'styled-components';

interface FeedbackModalProps {
  onSubmit: (feedback: string) => void;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const FeedbackModal: React.FC<FeedbackModalProps> = ({ onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <h2>Submit Feedback</h2>
        <TextArea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit Feedback</SubmitButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default FeedbackModal;
