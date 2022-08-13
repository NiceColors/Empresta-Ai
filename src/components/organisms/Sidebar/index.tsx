import { Avatar, Box, Flex, Heading, Icon, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { BookmarkFilledIcon, BookmarkIcon, ChevronLeftIcon, ChevronRightIcon, DashboardIcon, FileTextIcon, KeyboardIcon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import NavHeader from './NavHeader'
import NavItem from './NavItem'

interface IMenuItems {
    name: string;
    link: string;
    icon?: ReactElement;
}


export default function Sidebar() {
    const { pathname } = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useBreakpointValue({
        xs: true,
        md: false,
    })

    useEffect(() => {
        if (isMobile) setIsOpen(true)
    }, [isMobile])

    const handleIsOpen = () => {

        !isMobile && setIsOpen((prev) => !prev)
    }



    const isActive = (url: string) => {
        return pathname === url ? '#fff' : '#5f5c5c'
    }


    const menuItems: IMenuItems[] = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <Icon as={DashboardIcon} color={isActive('/dashboard')} fontSize={'xl'} />
        },
        {
            name: 'Emprestimos',
            link: '/emprestimos',
            icon: <Icon as={FileTextIcon} color={isActive('/emprestimos')} fontSize={'xl'} />
        },
        {
            name: 'Livros',
            link: '/livros',
            icon: <Icon as={BookmarkIcon} color={isActive('/livros')} fontSize={'xl'} />
        },
        {
            name: 'Clientes',
            link: '/clientes',
            icon: <Icon as={PersonIcon} color={isActive('/clientes')} fontSize={'xl'} />
        },
        {
            name: 'Usuários',
            link: '/usuarios',
            icon: <Icon as={KeyboardIcon} color={isActive('/usuarios')} fontSize={'xl'} />
        }
    ]



    return (

        <Flex
            flexDirection="column"
            py={4}
            justifyContent={'space-between'}
            h="100vh"
            pos="sticky"
            top={0}
            w="auto"
            bg={'#161618'}
            backdropFilter={'blur(160px)'}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            zIndex={2}
        >
            <Box
                position="absolute" w="21px" h="21px"
                borderRadius={'100%'} right={-2} top={'50px'}
                bgColor="#232323"
                border="1px solid #576157"
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                cursor="pointer"
                onClick={handleIsOpen}
            >
                {!isOpen ? <ChevronLeftIcon color="#fff" /> : <ChevronRightIcon color="#fff" />}
            </Box>

            <Flex
                flexDirection={'column'}
                px={3} py={4}
                w={isOpen ? '100px' : '290px'}
                overflow={'hidden'}
                transition={'all 0.3s ease-in-out'}
            >
                <Flex px={4} mb={16} gap={4} alignItems={'center'}>
                    <NavHeader mobile={isOpen} />
                </Flex>

                <Flex flexDirection={'column'} gap={4}>
                    <Text px={3} color={"#ffffff53"}>Geral</Text>
                    {menuItems.map((item, index) => (
                        <NavItem key={index} mobile={isOpen} data={item} pathname={pathname} />
                    ))}
                </Flex>
            </Flex  >


        </Flex >
    )
}
