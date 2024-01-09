import Navbar from '@/components/layout/Navbar';
import React from 'react';
import Crawling from '@/components/crawling';
import Likefunc from '@/components/like/likefunc';
const Main = () => {
  return (
    <div>
      <Navbar />
      <Crawling />
      <Likefunc />
    </div>
  );
};

export default Main;
