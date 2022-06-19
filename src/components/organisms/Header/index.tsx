import React, { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}
const Header: FC<IProps> = ({ children }) => {
  return <div>{children}</div>
}

export { Header }
