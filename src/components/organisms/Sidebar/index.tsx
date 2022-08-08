import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { AiFillHome } from 'react-icons/ai'
interface IMenuItems {
    name: string;
    link: string;
    icon?: ReactElement;
}


export default function Sidebar() {

    const menuItems: IMenuItems[] = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <AiFillHome />
        },
        {
            name: 'Emprestimos',
            link: '/emprestimos'
        },
        {
            name: 'Livros',
            link: '/livros'
        },
        {
            name: 'Clientes',
            link: '/clientes'
        },
        {
            name: 'Usuários',
            link: '/usuarios'
        }
    ]

    const { pathname } = useRouter()


    return (
        <Flex flexDirection="column" position="relative" py={4} justifyContent={'space-between'} minH={'100vh'} w={'100%'} maxW={{ base: '100px', sm: '280px' }} bgColor='#fff'>

            <Box position="absolute" w="21px" h="21px" borderRadius={'100%'} right={-3} top={20} bgColor="#77dd77">

            </Box>

            <Box>
                <Flex px={8} py={4} gap={4} mb={16}>
                    <Box w={12} h={10} borderRadius={'8px'} border="1px solid #297C3B"></Box>
                    {/* <Heading color="green.500" fontSize={'xl'} fontWeight={500}>Empresta Aí</Heading> */}
                </Flex>
                <Flex flexDirection={'column'} gap={8}>
                    {menuItems.map((item) => (
                        <Link href={`${item.link}`} key={item.link}>
                            <Flex px={8} gap={4} position='relative' cursor={'pointer'}                        >
                                {item.icon}
                                <Text
                                    color={item.link === pathname ? 'green.500' : '#828282'}
                                    fontWeight={500}
                                    className={item.link === pathname ? "link-active" : ''}
                                    display={{
                                        base: 'none',
                                        sm: 'block'
                                    }}
                                >{item.name}</Text>
                            </Flex>
                        </Link>

                    ))}
                </Flex>
            </Box >

            <Box w="90%" h="250px" m="0 auto" bgColor="green.200" borderRadius="8px" px={6}>
            </Box>


        </Flex >
    )
}
