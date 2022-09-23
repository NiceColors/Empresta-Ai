import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { FC, ReactElement, ReactNode, ReactPortal } from 'react'

interface IProps {
    children?: ReactNode | ReactElement | ReactElement[] | ReactPortal
}
const BookContainer: FC<IProps> = ({ children, ...props }) => {
    return (
        <Flex
            bgColor={'#161618'}
            borderRadius={14}
            flexDirection={'column'}
            justifyContent={'space-between'}
            px={6}
            py={4}
            gap={8}
        >
            {children}
        </Flex>
    )
}

export { BookContainer }


