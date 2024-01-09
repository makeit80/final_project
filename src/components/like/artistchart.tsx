'use client';
import { getArtist } from '@/api/chartapi';
import React, { useEffect, useState } from 'react';
import Likefunc from './likefunc';
const artistchart = () => {
  const [chartData, setChartData] = useState<any[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtist();
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (chartData === null) {
    // 데이터 로딩 중에 보일 컴포넌트 또는 로딩 상태 처리
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>artistchart</h2>

      {chartData?.map((item) => (
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

export default artistchart;
