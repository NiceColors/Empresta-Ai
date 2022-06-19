import { Button } from 'antd'
import React, { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}
const Card: FC<IProps> = ({ children }) => {



    
  return <Button>{children}</Button>
}

export { Card }
