import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #0066ff;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;

  li {
    font-size: 16px;
    cursor: pointer;
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>Vee</Logo>
      <NavLinks>
        <li>Social media</li>
        <li>Grants</li>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
