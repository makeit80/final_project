import React from 'react'
import Provider from '@/components/layout/Provider'

type Props = {
  children: React.ReactNode
}

function MainWrapper({ children }: Props) {
  return (
    <Provider>
        {children}
    </Provider>
  )
}

export default MainWrapper