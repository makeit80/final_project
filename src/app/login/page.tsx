'use client';

import React from 'react';
import { googleLogin, kakaoLogin, logOut } from '@/api/auth';

const login = () => {
  return (
    <>
      <form>
        <p>이메일</p>
        <input placeholder='이메일을 입력해주세요'></input>
        <p>비밀번호</p>
        <input placeholder='비밀번호를 입력해주세요'></input>
        <div>
          <button>로그인</button>
          <button onClick={googleLogin}>Google로 로그인하기</button>
          <button onClick={kakaoLogin}>kakao로 로그인하기</button>
          <button onClick={logOut}>로그아웃</button>
        </div>
      </form>
    </>
  );
};

export default login;
