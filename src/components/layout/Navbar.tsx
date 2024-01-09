'use client';
import { logOut } from '@/api/auth';
import { supabase } from '@/api/supabase';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styled from 'styled-components';
const Navbar = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  useEffect(() => {
    supabase.auth.getUserIdentities().then((info) => {
      if (info) console.log(info);
    });
  }, []);

  // 로그인부분은 임시,,! 후에 수정하겠습니다!
  return (
    <ScNav>
      <div onClick={() => handleNavigation('/main')}>Home</div>
      <div onClick={() => handleNavigation('/artist')}>Artist</div>
      <div onClick={() => handleNavigation('/community')}>Community</div>
      <div onClick={() => handleNavigation('/login')}>Login</div>
      <div onClick={() => handleNavigation('/login/signup')}>Signup</div>
      <button onClick={logOut}>로그아웃</button>
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
