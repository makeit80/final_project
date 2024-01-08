'use client';

import React, { useState } from 'react';
import { googleLogin, kakaoLogin, logOut } from '@/api/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const clickLoginButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    email.includes('@') && password.length >= 5
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    email.includes('@') && password.length >= 5
      ? setIsValid(true)
      : setIsValid(false);
  };

  return (
    <>
      <form onSubmit={clickLoginButtonHandler}>
        <p>이메일</p>
        <input
          placeholder='이메일을 입력해주세요'
          value={email}
          onChange={handleEmailInput}
        ></input>
        <p>비밀번호</p>
        <input
          type='password'
          placeholder='비밀번호를 5자 이상으로 입력해주세요'
          value={password}
          onChange={handlePasswordInput}
          minLength={5}
        ></input>
        <div>
          <button type='submit' disabled={!isValid}>
            로그인
          </button>
          <button onClick={googleLogin}>Google로 로그인하기</button>
          <button onClick={kakaoLogin}>kakao로 로그인하기</button>
          <button onClick={logOut}>로그아웃</button>
        </div>
      </form>
    </>
  );
};

export default Login;
