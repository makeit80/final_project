'use client';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/api/supabase';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
}

function likefunc({ postId, initialLikes }: LikeButtonProps) {
  //   const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLikeToggle = async () => {
    let { data: artists, error } = await supabase
      .from('artists')
      .select('like')
      .eq('id', postId);
    console.log(artists);

    if (error) {
      console.error('좋아요 불러오기 실패', error);
    }

    if (artists && artists.length > 0) {
      const currentLike = artists[0].like;
      setLikeCount(currentLike + 1);
      console.log(currentLike);
      try {
        await supabase.from('artists').upsert([
          {
            id: postId,
            like: likeCount + 1,
          },
          console.log('통과'),
        ]);
      } catch (error) {
        console.error('좋아요 토글 실패', error);
        setLikeCount(currentLike);
      }
    }
  };

  return (
    <>
      <button onClick={handleLikeToggle}>좋아요♡</button>
      <h1>{likeCount}</h1>
    </>
  );
}

export default likefunc;
