import React from 'react';
import styled from 'styled-components';

interface WarnContainerProps {
  textWarning?: string;
}

const WarnContainer = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ListIsEmpty: React.FC<WarnContainerProps> = ({ textWarning } = {

}) => {
  const text = textWarning ?? 'The grant list is empty';

  return (<WarnContainer>{text}</WarnContainer>);
}

export default ListIsEmpty;
