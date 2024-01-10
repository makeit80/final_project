import React from 'react';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';

import { addLikeartist } from '@/api/chartapi';

interface LikeButtonProps {
  postId: number;
}

function Likefunc({ postId }: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, void, unknown>({
    mutationFn: async () => {
      await addLikeartist(postId);
    },
    onSuccess: async () => {
      // 성공 시 수행할 작업

      queryClient.invalidateQueries({ queryKey: ['chart'] });
    },
    onError: (context) => {
      const previousData = context || {};
      queryClient.setQueryData(['chart'], previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chart'] });
    },
  } as UseMutationOptions<void, Error, void, unknown>);

  const handleLikeToggle = () => {
    mutate();
  };

  return (
    <>
      <button onClick={handleLikeToggle}>좋아요♡</button>
    </>
  );
}

export default Likefunc;
