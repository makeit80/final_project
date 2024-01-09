'use client';

import { signUp } from '@/api/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSignupButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(email, password, nickname);
    router.push('/main');
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    email.includes('@') &&
    password.length >= 6 &&
    password === passwordAgain &&
    nickname.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    email.includes('@') &&
    password.length >= 6 &&
    password === passwordAgain &&
    nickname.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePasswordAgainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordAgain = e.target.value;
    setPasswordAgain(passwordAgain);
    email.includes('@') &&
    password.length >= 6 &&
    password === passwordAgain &&
    nickname.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setNickname(nickname);
    email.includes('@') &&
    password.length >= 6 &&
    password === passwordAgain &&
    nickname.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  return (
    <>
      <form onSubmit={handleSignupButtonClick}>
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
        ></input>
        <p>비밀번호 확인</p>
        <input
          type='password'
          placeholder='비밀번호와 동일하게 입력해주세요'
          value={passwordAgain}
          onChange={handlePasswordAgainInput}
        ></input>
        <p>닉네임</p>
        <input
          placeholder='닉네임을 2자 이상으로 입력해주세요'
          value={nickname}
          onChange={handleNicknameInput}
        ></input>
        <div>
          <button type='submit' disabled={!isValid}>
            회원가입
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
