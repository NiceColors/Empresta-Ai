import { Box, Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Sidebar from '../components/organisms/Sidebar'

const LayoutLC = (children: ReactElement) => {

  return (
    <Flex minH="100vh" >

      <Sidebar />

      <Box bgColor="#EBF1F3" w="100%" px={8} py={12}>
        <Box>Salve</Box>
        {children}
      </Box>
    </Flex >
  )
}

export default LayoutLC
