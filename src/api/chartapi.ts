import { supabase } from './supabase';

interface ChartItem {
  rank: number;
  title: string;
  artist: string;
  like: number;
  like_user: JSON;
}
//아티스트 조회
export const getArtist = async () => {
  try {
    let { data: chart, error } = await supabase.from('chart').select('*');

    if (error) {
      console.error('조회 실패', error);
      return null;
    }
    return chart;
  } catch (error) {
    console.log('조회 에러', error);
  }
};
// 좋아요 버튼 클릭 전의 좋아요 수를 가져오는 api
export const getInitialLikes = async (postId: number) => {
  try {
    // postId에 해당하는 아티스트의 데이터를 가져옴
    const artistData = await getArtist();

    // 해당 아티스트 데이터가 있다면
    if (artistData) {
      // postId에 해당하는 아티스트의 데이터를 찾음
      const artist = artistData.find((item) => item.rank === postId);

      // 해당 아티스트가 있다면 좋아요 수를 반환
      if (artist) {
        return artist.like;
      }
    }

    // 해당 아티스트가 없거나 에러가 발생한 경우 기본값인 0 반환
    return 0;
  } catch (error) {
    console.error('좋아요 초기값 가져오기 실패', error);
    return 0; // 에러 발생 시 기본값인 0 반환
  }
};

// 좋아요 추가 API
export const addLikeartist = async (postId: number) => {
  try {
    // 좋아요 증가 요청
    const initialLikes = await getInitialLikes(postId);

    //존재하는 데이터 인지 확인
    const checkData = await supabase
      .from('chart')
      .select('*')
      .eq('rank', postId);
    if (checkData.data && checkData.data.length > 0) {
      // 이미 존재하는 경우, 해당 데이터를 업데이트
      const { data, error } = await supabase
        .from('chart')
        .update({ like: initialLikes + 1 })
        .eq('rank', postId);
    } else {
      console.log('존재하지 않는 데이터');
    }
  } catch (error) {
    console.log('좋아요 추가 실패', error);
  }
};
