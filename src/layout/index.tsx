import { Box, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'
import React, { FC, ReactElement } from 'react'
import Search from '../components/organisms/Search'
import Sidebar from '../components/organisms/Sidebar'

interface IProps {
  children?: ReactElement
}


export const Layout: FC<IProps> = ({ children }) => {

  return (
    <Grid
      templateColumns={'auto 1fr'}
      gap={4}
    >

      <GridItem>
        <Sidebar />
      </GridItem>

      <GridItem
      >
        <Box
          maxW={'1440px'}
          w="100%"
          m="0 auto"
          px={8}
          py={8}
        >
          <Search />
          {children}
        </Box>
      </GridItem>

    </Grid >
  )
}

