import { Badge, Box, Button, Flex, Heading, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { BookAction } from './BookAction'



export const BookDetails: FC<IBookDetailsProps> = (details) => {
    const lorem = 'Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad vero, modi dolorem totam illo, nemo accusantium eaque laboriosam vel nihil quis, temporibus vitae necessitatibus tempore minus ullam commodi aliquam corporis. dolor sit amet consectetur adipisicing elit.Ad vero, modi dolorem totam illo, nemo accusantium eaque laboriosam vel nihil quis, temporibus vitae necessitatibus tempore minus ullam commodi aliquam corporis.Lorem ipsum dolor sit amet consectetur adipisicing elit.Ad vero, modi dolorem totam illo, nemo accusantium eaque laboriosam vel nihil quis, temporibus vitae necessitatibus tempore minus ullam commodi aliquam corporis.'

    const { title, status, author, publisher, loanRate, synopsis, pages,  bannerUrl, releaseYear, createdAt } = details


    const screen = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box
            bgColor={'gray.900'}
            w={'100%'}
            borderRadius={14}
            px={6}
            py={4}
            maxH={{
                base: '100%',
                lg: '60vh'
            }}
            overflowY={'auto'}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box>
                    <Badge colorScheme={'purple'} mb={2}>Detalhes do livro</Badge>
                    <Heading fontSize={'clamp(1rem, 2.5vw, 2.5rem)'} mb={2} fontWeight={500}>{title ?? 'Lorem Ipsum'}</Heading>
                    <Text fontWeight={300} color="whiteAlpha.800">
                        <Text as={'span'} fontWeight={500}> Escrito por:</Text> {author ?? 'Lorem Ipsum'}
                    </Text>
                    <Text fontWeight={300} color="whiteAlpha.800">
                        <Text as={'span'} fontWeight={500}>Editora:</Text> {publisher ?? 'Lorem Ipsum'}
                    </Text>
                    <Text fontWeight={300} color="whiteAlpha.800">
                        <Text as={'span'} fontWeight={500}>Qntd de páginas:</Text> {pages ?? 'N/A'}
                    </Text>
                    <Text fontWeight={300} color="whiteAlpha.800">
                        Publicado em {releaseYear ? new Date(releaseYear).toLocaleDateString() : <strong>N/A</strong>}
                    </Text>
                </Box>
                <Box
                    w={'120px'}
                    minH={'110px'}
                >
                    {!screen && <BookAction src={bannerUrl} status={status} />}
                </Box>
            </Flex>
            <Box>
                <Text fontWeight={400} color="whiteAlpha.800" mt={6}>
                    <strong>Sinopse:</strong> <br />

                </Text>
                <Box
                    h={'20vh'}
                    overflowY={'auto'}
                >
                    {synopsis ?? lorem}
                </Box>
            </Box>
            <Badge my={4} colorScheme={!!status ? 'green' : 'red'}>{!!status ? 'ATIVO' : 'INATIVO'}</Badge>
        </Box>
    )
}



