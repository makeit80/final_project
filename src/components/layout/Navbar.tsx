'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';
const Navbar = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <ScNav>
      <div onClick={() => handleNavigation('/main')}>Home</div>
      <div onClick={() => handleNavigation('/artist')}>Artist</div>
      <div onClick={() => handleNavigation('/community')}>Community</div>
      <div onClick={() => handleNavigation('/login')}>Login</div>
    </ScNav>
  );
};
const ScNav = styled.nav`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  div {
    cursor: pointer;
  }
`;
export default Navbar;
