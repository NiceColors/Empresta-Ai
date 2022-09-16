import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Box, Button, Flex, Grid, GridItem, Heading, HStack, Icon, IconButton, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react'
import { ArrowTopLeftIcon, ArrowTopRightIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonTable } from '../components/atoms/ButtonTable/Index'
import { BookContainer } from '../components/atoms/Containers/BookContainer'
import { BookAction } from '../components/molecules/Books/BookAction'
import { BookDetails } from '../components/molecules/Books/BookDetails'
import { BookModal } from '../components/molecules/Books/Modal'
import { useFetch } from '../hooks/useFetch'
import { api } from '../services/apiClient'
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
  const formProps = useForm()
  const { handleSubmit, reset, control } = formProps
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: bookModalIsOpen, onOpen: bookModalOnOpen, onClose: bookModalOnClose } = useDisclosure()
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()
  const [page, setPage] = useState<number | null>(0)

  const { data: response, isFetching, error } = useFetch('/books?limit=32', {
    params: {
      page
    }
  });

  const { data } = response

  const [selectedBook, setSelectedBook] = useState<IBookDetailsProps>(data[0] ?? details)
  const { limit, total } = response
  const totalPages = Math.ceil(total / limit)
  const toast = useToast()

  const onDelete = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.delete(`/books`, {
        data: {
          id: selectedBook.id
        }
      })
      const deleteMessage = data?.message ?? 'O livro selecionado foi deletado com sucesso.'
      toast({
        title: `livro deletado`,
        description: deleteMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
    } catch (err: any) {
      console.log(err)
      const errorMessage = err.response?.data?.message ?? 'Erro ao deletar o livro'
      toast({
        title: `${errorMessage}`,
        status: 'error',
        isClosable: true,
        position: 'top'
      })
    } finally {
      setIsLoading(false)
      setPage(page === 0 ? null : 0)
    }
  }

  const handleEditSubmit = handleSubmit(async (values) => {
    try {
      const { data: response } = await api.put(`/books`, {
        ...values,
      })
      const editMessage = response?.message ?? 'O Livro selecionado foi editado com sucesso.'
      toast({
        title: `livro editado`,
        description: editMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      bookModalOnClose()
    } catch (error) {
      toast({
        title: `Error ao editar o livro`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      })
    } finally {
      setPage(page === 0 ? null : 0)
    }
  })

  const handleCreateSubmit = handleSubmit(async (values) => {

    try {
      const { data: response } = await api.post(`/books`, {
        ...values,
      })
      const createMessage = response?.message ?? 'O livro selecionado foi criado com sucesso.'
      toast({
        title: `Livro criado`,
        description: createMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      bookModalOnClose()
    } catch (error) {
      console.log(error)
      toast({
        title: `Error ao criar o livro`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      })
    } finally {
      setPage(page === 0 ? null : 0)
    }
  })


  const screen = useBreakpointValue({
    base: false,
    lg: true,
  })
  const cancelRef = React.useRef() as React.RefObject<HTMLButtonElement>


  const Dialog = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color={'red.500'}>
              Deletar livro
            </AlertDialogHeader>

            <AlertDialogBody color={'red.400'}>
              Tem certeza de que deseja deletar este livro?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button color={'gray.900'} size={'sm'} ref={cancelRef} onClick={onClose}>
                cancelar
              </Button>
              <Button size={'sm'} colorScheme='red' onClick={() => {
                onDelete()
                onClose()
              }} ml={3} >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
  }


  useEffect(() => {

    reset({
      ...selectedBook,
      releaseYear: new Date(selectedBook.releaseYear).toLocaleDateString('en-ca')
    })

  }, [selectedBook])

  useEffect(() => {

    if (router.query.reload === 'true') {
      setPage(page === 0 ? null : 0)
      setSelectedBook((prevState) => ({ ...prevState, status: !prevState.status }))
    }


  }, [router])


  return (
    <Box>

      <Grid
        templateColumns={
          ['1fr', '1fr', '1fr', '300px 1fr']
        }
        gap={4}
      >
        {screen && <BookAction hash={selectedBook?.loanId} src={selectedBook?.bannerUrl} status={selectedBook?.status} />}
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
            <Flex justifyContent={'flex-end'}>
              <Button colorScheme={'green'} size={'sm'} onClick={() => {
                setIsEdit(false)
                bookModalOnOpen()
                reset({})
              }}>+ Criar</Button>
            </Flex>
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
                      {book.status &&
                        <IconButton
                          size={'sm'}
                          variant='outline'
                          colorScheme='red'
                          aria-label='Delete nook'
                          _hover={{
                            boxShadow: 'md',
                            backgroundColor: '#c51c2af0',
                            color: '#fff'
                          }}
                          transition='all 0.25s ease-in-out'
                          icon={<TrashIcon />}
                          onClick={() => {
                            setSelectedBook(book)
                            onOpen()
                          }}
                        />}
                      <IconButton
                        size={'sm'}
                        variant='outline'
                        colorScheme='green'
                        _hover={{
                          boxShadow: 'md',
                          backgroundColor: '#7a7226ee',
                          color: '#fff'
                        }}
                        color={book.status ? '#7a7226ee' : '#c51c2af0'}
                        transition='all 0.25s ease-in-out'
                        aria-label='Edit book'
                        icon={<Pencil2Icon />}
                        onClick={() => {
                          setSelectedBook(book)
                          bookModalOnOpen()
                          setIsEdit(true)
                        }}
                        isLoading={isLoading && book.id === selectedBook.id}
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
      <Dialog />
      <Box as={'form'} action={""} onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit}>
        <BookModal
          isOpen={bookModalIsOpen}
          onClose={bookModalOnClose}
          isEdit={isEdit}
          isLoading={isLoading}
          control={control}
          formProps={formProps}
        />
      </Box>
    </Box>
  )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }

})

