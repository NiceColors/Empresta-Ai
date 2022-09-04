import { Box, Flex, Grid, GridItem, Input } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Search from '../components/organisms/Search'
import Sidebar from '../components/organisms/Sidebar'

const LayoutLC = (children: ReactElement) => {

  return (
    <Grid w="100%" templateColumns={'auto 1fr'} >

      <GridItem>
        <Sidebar />
      </GridItem>

      <GridItem
        px={8}
        py={8}
      >

        <Search />

        <Box
          w="100%"
        >
          {children}
        </Box>
      </GridItem>

    </Grid >
  )
}

export default LayoutLC
