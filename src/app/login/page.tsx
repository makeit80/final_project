'use client';

import React, { useEffect, useState } from 'react';
import { googleLogin, kakaoLogin } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { supabase } from '@/api/supabase';

const Login = () => {
  //user 정보 test
  useEffect(() => {
    const userInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    };
    userInfo();
  }, []);

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleLoginButtonClick = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (data.user !== null) router.push('/');
    if (error) alert('로그인에 실패했습니다');
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    email.includes('@') && password.length >= 6
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    email.includes('@') && password.length >= 6
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handleSignupButton = () => {
    router.push('/login/signup');
  };

  return (
    <>
      <form onSubmit={handleLoginButtonClick}>
        <p>이메일</p>
        <input
          placeholder='이메일 형식으로 입력해주세요'
          value={email}
          onChange={handleEmailInput}
        ></input>
        <p>비밀번호</p>
        <input
          type='password'
          placeholder='비밀번호를 6자 이상으로 입력해주세요'
          value={password}
          onChange={handlePasswordInput}
          minLength={6}
        ></input>
        <div>
          <button type='submit' disabled={!isValid}>
            로그인
          </button>
          <button onClick={googleLogin}>Google로 로그인하기</button>
          <button onClick={kakaoLogin}>kakao로 로그인하기</button>
          <button onClick={handleSignupButton}>회원가입</button>
        </div>
      </form>
    </>
  );
};

export default Login;
