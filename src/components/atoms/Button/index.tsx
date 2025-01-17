import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IProps {
  content: string
}
const ButtonCustom: FC<IProps> = ({ content }) => {
  return <Button>{content}</Button>
}

export { ButtonCustom }
