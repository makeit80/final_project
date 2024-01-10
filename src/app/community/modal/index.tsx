import React from 'react'
import { 
  ScModalBox,
  ScModalContent,
 } from './style'

export default function Modal( props:any ) {
  const { clickModal } = props

  return (
    <>
        <ScModalBox onClick={clickModal}>
          <ScModalContent onClick={(e) => e.stopPropagation()}></ScModalContent>
        </ScModalBox>
    </>
  )
}
