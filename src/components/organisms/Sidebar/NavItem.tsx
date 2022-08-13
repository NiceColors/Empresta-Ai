import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'

interface NavItemProps {
  pathname: string;
  mobile: boolean;
  data: {
    name: string;
    link: string;
    icon?: React.ReactElement;
  }

}
export default function NavItem({ data, pathname, mobile }: NavItemProps) {


  const { link, name, icon } = data

  return (
    <>
      <Link href={`${link}`} key={link}>
        <Flex
          gap={4}
          alignItems={'center'}
          cursor={'pointer'}
          bgColor={link === pathname ? 'rgba(255, 255, 255, 0.03)' : ''}
          px={4}
          py={3}
          borderRadius={'12px'}
        >
          {icon}
          <Text
            fontWeight={400}
            className={link === pathname ? "active-link" : 'nav-link'}
            visibility={!mobile ? 'visible' : 'hidden'}
          > {name}</Text>
        </Flex>
      </Link>
    </>
  )
}
