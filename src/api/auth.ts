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
  if (data) alert('로그인 되었습니다');
  if (error) console.log('error', error);
};

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
  if (data) alert('로그인되었습니다');
  if (error) console.log('error', error);
};

export async function logOut() {
  const { error } = await supabase.auth.signOut();
}