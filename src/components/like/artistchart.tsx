'use client';
import React from 'react';

import { getArtist } from '@/api/chartapi';
import Likefunc from './likefunc';
import { useQuery } from '@tanstack/react-query';

interface ChartItem {
  rank: number;
  title: string;
  artist: string;
  like: number;
  like_user: JSON;
}
const Artistchart = () => {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useQuery<ChartItem[], Error, ChartItem[], string>(
    {
      queryKey: 'chart',
    },
    getArtist,
  );

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생 </div>;
  }

  return (
    <div>
      <h2>artistchart</h2>

      {chartData?.map((item: any) => (
        <ul key={item.rank}>
          <li>{item.rank}</li>
          <li>{item.title}</li>
          <li>{item.artist}</li>
          <li>{item.like}</li>
          <Likefunc postId={item.rank} />
        </ul>
      ))}
    </div>
  );
};

export default Artistchart;
