import React, { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}
const Card: FC<IProps> = ({ children }) => {

  return <>{children}</>
}

export { Card }
