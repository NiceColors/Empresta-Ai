import { Typography } from 'antd'
import type { NextPage } from 'next'
import React from 'react'
import { BreakPoint } from '../hooks/useBreakpoint'

const Home: NextPage = () => {
  const screens = BreakPoint()

  return (
    <>
      <Typography>Hello World</Typography>
    </>
  )
}

export default Home
