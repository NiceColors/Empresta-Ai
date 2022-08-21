import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import { setupAPIClient } from '../../../services/api'
import { api } from '../../../services/apiClient'
import { withSSRAuth } from '../../../utils/withSSRAuth'



type TSearchBooksProps = {
    pages: number
    author: string
    title: string
}

async function searchBooks(page: number = 0, search: string | number | boolean): Promise<any> {

    // const response = await api.get(`http://localhost:3333/books?title=${search}`);
    // return response.data;
    return await []

}

export default function Search() {

    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);

    const data = searchBooks(page, debouncedSearch) as any;

    function handleSearchChange(e: any) {
        setSearch(e.target.value);
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
                    <Flex
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
                    </Flex>

                )}






            </Stack >

        </>
    )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {


    // const apiClient = setupAPIClient(ctx)
    // const response = await apiClient.get('users/me')

    const apiClient = setupAPIClient(ctx)
    try {
        await apiClient.get('books')
    } catch (error) {
        console.log(error)
    }

    return {
        props: {

        }
    }
})