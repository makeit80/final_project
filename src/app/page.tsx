'use client'

import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  router.replace('main')
  return null
}

export default Home
