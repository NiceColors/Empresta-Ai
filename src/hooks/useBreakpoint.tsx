import { Grid } from 'antd'
const { useBreakpoint } = Grid

const BreakPoint = () => {
  const screens = useBreakpoint()
  return screens
}

export { BreakPoint }
