"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api/crawler';

const Footer = () => {
  // const { data: artistData } = useQuery({
  //   queryKey: ['crawling'],
  //   queryFn: fetchData,
  // })
  // console.log('artistData', artistData)


  return (
    <div>Footer</div>
  )
}

export default Footer