import React from 'react'
import Provider from '@/components/layout/Provider'

type Props = {
  children: React.ReactNode
}

function MainWrapper({ children }: Props) {
  return (
    <main>
        {children}
    </main>
  )
}

export default MainWrapper