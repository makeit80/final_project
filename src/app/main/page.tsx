import Navbar from '@/components/layout/Navbar';
import React from 'react';
import Crawling from '@/components/crawling';
import Footer from '@/components/layout/Footer';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Crawling />
      <Footer />
    </div>
  );
};

export default Main;
