import { Badge, Box, Button, Flex, Grid, GridItem, Heading, HStack, Icon, IconButton, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue } from '@chakra-ui/react'
import { ArrowTopLeftIcon, ArrowTopRightIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonTable } from '../components/atoms/ButtonTable/Index'
import { BookContainer } from '../components/atoms/Containers/BookContainer'
import { BookAction } from '../components/molecules/Books/BookAction'
import { BookDetails } from '../components/molecules/Books/BookDetails'
import { useFetch } from '../hooks/useFetch'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Livros() {
  const src = 'http://books.google.com/books/content?id=XslyDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_ap'

  const details: IBookDetailsProps = {
    title: 'Todas as flores que não te enviei',
    bannerUrl: src,
    author: 'Victor Batista',
    publisher: 'Saraiva',
    status: false,
    releaseYear: new Date(),
    pages: 200,
  }


  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { handleSubmit, reset, register, setValue, control, formState: { errors }, setError } = useForm<any>()
  const [page, setPage] = useState<number | null>(0)

  const { data: response, isFetching, error } = useFetch('/books?limit=32', {
    params: {
      page
    }
  });

  const { data } = response

  const [selectedBook, setSelectedBook] = useState<IBookDetailsProps>(data[0] ?? details)



  const booksInactive = data.filter((book: IBookDetailsProps) => !book.status)

  const { limit, total } = response
  const totalPages = Math.ceil(total / limit)

  const screen = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>

      <Grid
        templateColumns={
          ['1fr', '1fr', '1fr', '300px 1fr']
        }
        gap={4}
      >
        {screen && <BookAction src={selectedBook?.bannerUrl} status={selectedBook?.status} />}
        <BookContainer
        >
          <BookDetails {...selectedBook} />
        </BookContainer>
      </Grid>

      <Tabs mt={6}>
        <TabList>
          <Tab>
            <Heading fontSize={'xl'} fontWeight={600}>Livros</Heading>
          </Tab>
          {/* <Tab >
            <Heading fontSize={'xl'} fontWeight={600}>Em empréstimo</Heading>
          </Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              gap={6}
              mt={6}
              templateColumns={'repeat(auto-fit, minmax(130px, 1fr))'}
            >
              {data?.map((book: IBookDetailsProps) => (
                <GridItem
                  mt={12}
                  key={book.id}
                >
                  <Flex
                    w={'146px'}
                    flexDir={'column'}
                    justifyContent={'space-between'}
                    minH={'190px'}
                    bgColor={selectedBook?.id === book.id ? '#ffffff' : '#2d2e30'}
                    borderRadius={'12px'}
                    pos={'relative'}
                    boxShadow={'xl'}
                  >
                    <Image
                      src={book?.bannerUrl}
                      borderRadius={'12px 12px 0px 0px'}
                      h={'190px'}
                      onClick={() => {
                        setSelectedBook(book)
                      }}
                      filter={selectedBook?.id === book.id ? 'brightness(1.1)' : 'brightness(0.6)'}
                      cursor={selectedBook?.id === book.id ? 'default' : 'pointer'}
                      _hover={{
                        filter: 'brightness(1)',
                      }}
                      transition='all 0.3s ease-in-out'

                    />
                    <Flex gap={2} justifyContent={'flex-end'} px={2} py={3}>
                      <IconButton
                        size={'sm'}
                        variant='outline'
                        colorScheme='red'
                        aria-label='Delete user'
                        _hover={{
                          boxShadow: 'md',
                          backgroundColor: '#c51c2af0',
                          color: '#fff'
                        }}
                        transition='all 0.25s ease-in-out'
                        icon={<TrashIcon />}
                      />
                      <IconButton
                        size={'sm'}
                        variant='outline'
                        colorScheme='yellow'
                        _hover={{
                          boxShadow: 'md',
                          backgroundColor: '#94881def',
                          color: '#fff'
                        }}
                        transition='all 0.25s ease-in-out'
                        aria-label='Delete user'
                        icon={<Pencil2Icon />}
                      />
                    </Flex>

                  </Flex>
                </GridItem>
              ))}

            </Grid>
            <HStack mt={4} justifyContent={'space-between'} align={'center'} spacing={6}>
              <Box>
                <strong>{page}</strong> - <strong>{totalPages}</strong> de <strong>{totalPages}</strong>
              </Box>
              <HStack spacing={2}>
                {[... new Array(totalPages).fill(0)].map((_, index: number) => (
                  <ButtonTable key={index} content={index + 1} isFirst={(page ?? 0) === index} onClick={() => setPage(index)} />
                ))}
              </HStack>

            </HStack>
          </TabPanel>
          <TabPanel>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }

})