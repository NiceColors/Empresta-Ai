import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useBooks } from '../../../hooks/useBooks'
import { useDebounce } from '../../../hooks/useDebounce'
import { setupAPIClient } from '../../../services/api'
import { api } from '../../../services/apiClient'
import { withSSRAuth } from '../../../utils/withSSRAuth'



type TSearchBooksProps = {
    pages: number
    author: string
    title: string
}

function searchBooks(page: number = 0, search: string | number | boolean) {
    return useQuery(
        ["books", { page, search }],
        async () => {
            const response = await api.get(`http://localhost:3333/books?title=${search}`);
            return response.data;
        },
        // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
    );
}

export default function Search() {

    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [isRender, setIsRender] = useState(false)
    const debouncedSearch = useDebounce(search, 200);

    const { isFetching, isError, data, error } = searchBooks(page, debouncedSearch);

    function handleSearchChange(e: any) {
        setSearch(e.target.value);
    }

    useEffect(() => {
        setIsRender(true)
    }, [])


    function MotionList() {

        return (
            <Box
                maxH={'40vh'}
                overflowY={'scroll'}
            >
                <AnimateSharedLayout>
                    <Flex
                        flexDirection={'column'}
                        as={motion.ul}
                        w="100%"
                        layout
                    >
                        {data?.books?.length > 0 && data?.books?.map((item: any) => (
                            <Item key={item} book={item} />
                        ))}
                    </Flex>
                </AnimateSharedLayout>
            </Box>
        );
    }

    function Item({ book }: any) {
        const [isOpen, setIsOpen] = useState(false);

        const toggleOpen = () => setIsOpen(!isOpen);

        return (
            <Box
                as={motion.li}
                layout onClick={toggleOpen}
                overflow={'hidden'}
                cursor={'pointer'}
                mb={4}
                borderRadius={'5px'}
                py={3}
                px={6}
                bgColor={'gray.600'}
                _hover={{
                    filter: 'brightness(95%)',
                }}
            >


                <Flex mb={2} alignItems='center' gap={4}>
                    <Box
                        as={motion.div}
                        w={'30px'}
                        h={'40px'}
                        borderRadius={'2px'}
                        bgImage={`url(${book.bannerUrl})`}
                        bgSize={'contain'}
                        layout
                    />
                    <Text
                        as={motion.p}
                        layout fontWeight={500}
                        color={'whiteAlpha.800'}
                    >{book.title} - {book.author}</Text>
                </Flex>

                <AnimatePresence>{isOpen &&
                    <Box
                        as={motion.div}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Text
                            fontWeight={300}
                            color={'whiteAlpha.800'}

                        >{book.synopsis || 'Sem sinopse'}</Text>
                    </Box>}
                </AnimatePresence>
            </Box>
        );
    }





    return (
        <>
            <Stack
                mb={4}
                mt={2}
                maxW="872px"
                w="100%"
                position={'relative'}
            >
                <InputGroup
                    size="lg"
                >
                    <Input
                        variant={'outline'}
                        bgColor="gray.700"
                        focusBorderColor='blue.700'
                        _hover={{ borderColor: 'blue.500' }}
                        borderColor={'gray.700'}
                        color="green.400"
                        placeholder='Buscar na plataforma por...'
                        onChange={handleSearchChange}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                    />

                    <InputRightElement
                        pointerEvents='none'
                        // eslint-disable-next-line react/no-children-prop
                        children={<SearchIcon color='gray.300' />}
                    />
                </InputGroup>


                {data?.books?.length && data.books.length > 0 && (
                    <MotionList />
                )}

                {/* <Flex
                                            w="100%"
                                            bgColor="gray.700"
                                            minH={'40px'}
                                            borderRadius={'5px'}
                                            py={4}
                                            px={4}
                                            flexDirection="column"
                                            position={'absolute'}
                                            top={'50px'}
                                            display={isOpen ? 'block' : 'none'}
                                            transition={'all 0.8s ease-in-out'}
                                            zIndex={2}
                                            boxShadow={'0 4px 12px 0 rgba(0, 0, 0, 0.15)'}
                                            maxH={'40vh'}
                                            overflowY={'auto'}
                                        >
                                            {data?.books?.map(({ title, author, pages }: TSearchBooksProps, i: number) => 
                                                <Box
                                                    key={i}
                                                    mb={4}
                                                    borderRadius={'5px'}
                                                    py={3}
                                                    px={6}
                                                    bgColor={'gray.600'}
                                                    cursor={'pointer'}
                                                    _hover={{
                                                        filter: 'brightness(90%)',
                                                    }}
                                                >
                                                    <Text
                                                        fontWeight={500}
                                                        color={'whiteAlpha.900'}
                    
                                                    >{title} - {pages}</Text>
                                                </Box>
                                            )}
                                        </Flex> */}





            </Stack >

        </>
    )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {


    // const apiClient = setupAPIClient(ctx)
    // const response = await apiClient.get('users/me')

    const apiClient = setupAPIClient(ctx)
    await apiClient.get('books')



    return {
        props: {

        }
    }
})