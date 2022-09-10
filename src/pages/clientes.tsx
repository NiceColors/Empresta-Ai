import {
  AlertDialog, AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay, Badge,
  Box, Button, Flex, Grid, Heading,
  HStack, IconButton, Table,
  TableContainer, Tbody, Td, Th,
  Thead, Tr, useBreakpoint, useBreakpointValue, useDisclosure,
  useToast
} from '@chakra-ui/react'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { HashLoader } from 'react-spinners';
import { ButtonTable } from '../components/atoms/ButtonTable/Index'
import { TableContainerCustom } from '../components/atoms/Containers/TableContainer';
import { ClientModal } from '../components/molecules/Clientes/Modal';
import { UserModal } from '../components/molecules/Users/Modal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth'

interface IDataProps {
  data: any[]
  limit: number;
  total: number;
}

type FormValues = {
  name: string;
  email: string;
  birthdate: string;
  permissions: {
    value: string;
  }[];
  cpf: string;
  role: any;
  password: string;
}


let cpfFormatter = /(\d{3})(\d{3})(\d{3})(\d{2})/
let cpfMask = (value: string) => {
  return value?.replace(cpfFormatter, '$1.$2.$3-$4')
}

const roles = {
  'INTERN': 'Estagiário',
  'MANAGER': 'ADMINISTRADOR'
}

export default function Clientes() {

  const [selectedClient, setSelectedClient] = useState<IClientProps>({} as IClientProps)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: userModalIsOpen, onOpen: userModalOnOpen, onClose: userModalOnClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)


  const { handleSubmit, reset, register, setValue, control, formState: { errors }, setError } = useForm<FormValues>()
  const [page, setPage] = useState<number | null>(0)
  const { data: response, isFetching, error } = useFetch('/clients?limit=7', {
    params: {
      page
    }
  });

  const { limit, total, data }: IDataProps = response
  const cancelRef = React.useRef() as React.RefObject<HTMLButtonElement>
  const toast = useToast()


  const totalPages = Math.ceil(total / limit)

  const onDelete = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.delete(`/clients`, {
        data: {
          id: selectedClient.id
        }
      })
      const deleteMessage = data?.message ?? 'O cliente selecionado foi deletado com sucesso.'
      toast({
        title: `cliente deletado`,
        description: deleteMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
    } catch (err: any) {
      console.log(err)
      const errorMessage = err.response?.data?.message ?? 'Erro ao deletar o cliente'
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
      const { data: response } = await api.put(`/clients`, {
        ...values,
      })
      const editMessage = response?.message ?? 'O cliente selecionado foi editado com sucesso.'
      toast({
        title: `Cliente editado`,
        description: editMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      userModalOnClose()
    } catch (error) {
      toast({
        title: `Error ao editar o cliente`,
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
      const { data: response } = await api.post(`/clients`, {
        ...values,
        birthdate: new Date(values.birthdate),
      })
      const createMessage = response?.message ?? 'O cliente selecionado foi criado com sucesso.'
      toast({
        title: `cliente criado`,
        description: createMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      userModalOnClose()
    } catch (error) {
      console.log(error)
      toast({
        title: `Error ao criar o cliente`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      })
    } finally {
      setPage(page === 0 ? null : 0)
    }
  })


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
              Deletar cliente
            </AlertDialogHeader>

            <AlertDialogBody color={'red.400'}>
              Tem certeza de que deseja deletar este cliente?
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
      ...selectedClient,
      birthdate: new Date(selectedClient.birthdate).toLocaleDateString(),
      cpf: cpfMask(selectedClient.cpf)
    })

  }, [selectedClient])

  return (
    <>
      <Grid
        overflowY={'hidden'}
      >

        <TableContainerCustom>
          <Flex justifyContent={'space-between'} align={'center'}>
            <Heading
              mb={6}
              fontSize={['sm', 'lg', '3xl', '4xl']}
              fontWeight={600}
            >Clientes</Heading>
            <Button colorScheme={'green'} size={'sm'} onClick={() => {
              setIsEdit(false)
              userModalOnOpen()
              reset({})
            }}>+ Add</Button>
          </Flex>
          <Table
            variant='simple'
            colorScheme={'blue'}
          >
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CPF</Th>
                <Th>Data de nascimento</Th>
                <Th isNumeric>Ações</Th>
              </Tr>
            </Thead>
            <Tbody >
              {data?.map((client: IClientProps, index: number) => {
                return (
                  <Tr key={client.id} >
                    <Td>{client.name.split(' ').slice(0, 2).join(' ')}</Td>
                    <Td>{cpfMask(client.cpf).slice(0, 14)}</Td>
                    <Td>{new Date(client.birthdate).toLocaleDateString()}</Td>
                    <Td>
                      <Flex gap={2} justifyContent={'flex-end'}>

                        <IconButton
                          variant='outline'
                          colorScheme='yellow'
                          aria-label='Delete client'
                          icon={<Pencil2Icon />}
                          onClick={() => {
                            setSelectedClient(client)
                            userModalOnOpen()
                            setIsEdit(true)
                          }}
                          isLoading={isLoading && client.id === selectedClient.id}
                        />
                        <IconButton
                          variant='outline'
                          colorScheme='red'
                          aria-label='Delete client'
                          icon={<TrashIcon />}
                          onClick={() => {
                            setSelectedClient(client)
                            onOpen()
                          }}
                          isLoading={isLoading && client.id === selectedClient.id}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                )
              }
              )}
            </Tbody>
          </Table>
        </TableContainerCustom>

        {/* Paginação */}
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
        <Dialog />
        <ClientModal
          isOpen={userModalIsOpen}
          onClose={userModalOnClose}
          onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit}
          isEdit={isEdit}
          isLoading={isLoading}
          control={control}
          register={register}
          setValue={setValue}
        />
      </Grid>

    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {

    }
  }

})