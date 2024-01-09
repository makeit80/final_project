"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api/crawler';

const Footer = () => {

  const { data: chartList } = useQuery({
    queryKey: ['chartList'],
    queryFn: fetchData
  })
  console.log('chartList ===> ', chartList)

  return (
    <div>Footer</div>
  )
}

export default Footer