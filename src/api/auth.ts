import { supabase } from './supabase';

// google 로그인
export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  console.log(data);
  if (error) console.log('error', error);
};

// kakao 로그인
export const kakaoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (data) alert('로그인 되었습니다');
  if (error) console.log('error', error);
};

// 로그아웃
export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  alert('로그아웃 되었습니다');
};

// 이메일 회원가입
export const signUp = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      // emailRedirectTo: email,
      data: {
        nickname: nickname,
      },
    },
  });
  console.log(data);
  if (error) console.log('error', error);
};
