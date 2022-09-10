import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { FC, ReactElement, ReactNode, ReactPortal } from 'react'

interface IProps {
    children?: ReactNode | ReactElement | ReactElement[] | ReactPortal
}
const TableContainerCustom: FC<IProps> = ({ children, ...props }) => {
    return (
        <Box
            bgColor={'gray.700'}
            p={6}
            borderRadius={9}
            whiteSpace={'normal'}
            overflowX={'scroll'}
            maxW={['70vw', '70vw', '90vw']}
            width={'100%'}
            minH={'76vh'}
            overflowY={'scroll'}
            {...props}
        >
            {children}
        </Box>
    )
}

export { TableContainerCustom }


