// if (index === 0)
// return (
//     <Button
//         size={'sm'}
//         fontSize={'xs'}
//         w={'4'}
//         colorScheme={'green'}
//         disabled
//         _disabled={{
//             bgColor: 'green.500',
//             cursor: 'default',
//         }}
//     >
//         {index + 1}
//     </Button>
// )
// return (
// <Button
//     size={'sm'}
//     fontSize={'xs'}
//     w={'4'}
//     colorScheme={'gray.700'}
//     _hover={{
//         bgColor: 'gray.500',
//     }}
// >
//     {index}
// </Button>
// )

import { Button, ButtonProps } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IProps extends ButtonProps {
    isFirst: boolean;
    content: number | string
}
const ButtonTable: FC<IProps> = ({ content, isFirst, ...rest }) => {

    return <Button
        size={'sm'}
        fontSize={'xs'}
        w={'4'}
        {...rest}
        {...isFirst ?
            {
                _hover: { bgColor: 'green.500' },
                colorScheme: 'green',
                disabled: true,
                _disabled: {
                    bgColor: 'green.500',
                    cursor: 'default',
                }
            } :
            {
                bgColor: 'gray.700',
                _hover: { bgColor: 'gray.500' }
            }
        }
    > {content}</Button >
}

export { ButtonTable }
