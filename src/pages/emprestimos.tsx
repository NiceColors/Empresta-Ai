import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Button, Flex, Grid, Heading, IconButton, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TableContainerCustom } from '../components/atoms/Containers/TableContainer'
import { Can } from '../components/Can'
import { LoanModal } from '../components/molecules/Loans/Modal'
import { useFetch } from '../hooks/useFetch'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'


interface IDataProps {
  data: any[]
  limit: number;
  total: number;
}

type FormValues = {
  id: string;
  employeeName: string;
  employeeId: { value: string, label: string };
  clientName: string;
  clientId: { value: string, label: string };
  bookTitle: string;
  bookId: { value: string, label: string };
  loanRateValue?: number;
  status: boolean;
  startDate: Date | string;
  endDate: Date | string;
}


export default function Emprestimos() {

  const [isLoading, setIsLoading] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<ILoanProps>({} as ILoanProps)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: loanModalIsOpen, onOpen: loanModalOnOpen, onClose: loanModalOnClose } = useDisclosure()
  const [isEdit, setIsEdit] = useState(false)

  const { handleSubmit, reset, register, setValue, control, formState: { errors }, setError } = useForm<FormValues>()
  const [page, setPage] = useState<number | null>(0)
  const { data, isFetching, error } = useFetch('/loans?limit=8', {
    params: {
      page
    }
  });

  const { limit, total, data: loans }: IDataProps = data
  const cancelRef = React.useRef() as React.RefObject<HTMLButtonElement>
  const toast = useToast()

  const totalPages = Math.ceil(total / limit)

  const onDelete = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.delete(`/loans`, {
        data: {
          id: selectedLoan.id
        }
      })
      const deleteMessage = data?.message ?? 'O empréstimo selecionado foi deletado com sucesso.'
      toast({
        title: `Empréstimo deletado`,
        description: deleteMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
    } catch (err: any) {
      console.log(err)
      const errorMessage = err.response?.data?.message ?? 'Erro ao deletar o usuário'
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

  const handleEditSubmit = handleSubmit(async (values: any) => {
    try {
      const { data: response } = await api.put(`/loans`, {
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        clientId: values.clientId.value,
        employeeId: values.employeeId.value,
        bookId: values.bookId.value,
      })
      const editMessage = response?.message ?? 'O empréstimo selecionado foi editado com sucesso.'
      toast({
        title: `Empréstimo editado`,
        description: editMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      loanModalOnClose()
    } catch (error) {
      toast({
        title: `Error ao editar o empréstimo`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      })
    } finally {
      setPage(page === 0 ? null : 0)
    }
  })

  const handleCreateSubmit = handleSubmit(async (values: any) => {

    console.log(values)

    try {
      const { data: response } = await api.post(`/loans`, {
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        clientId: values.clientId.value,
        employeeId: values.employeeId.value,
        bookId: values.bookId.value,
      })
      const createMessage = response?.message ?? 'O empréstimo selecionado foi criado com sucesso.'
      toast({
        title: `empréstimo criado`,
        description: createMessage,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      loanModalOnClose()
    } catch (error) {
      toast({
        title: `Error ao criar o empréstimo`,
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
              Deletar empréstimo
            </AlertDialogHeader>

            <AlertDialogBody color={'red.400'}>
              Tem certeza de que deseja deletar este empréstimo?
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

    console.log(selectedLoan)

    reset({
      employeeId: { value: selectedLoan.employeeId, label: selectedLoan.employeeName },
      clientId: { value: selectedLoan.clientId, label: selectedLoan.clientName },
      bookId: { value: selectedLoan.bookId, label: selectedLoan.bookTitle },
      startDate: selectedLoan.startDate && new Date(selectedLoan.startDate).toISOString().split('T')[0],
      endDate: selectedLoan.endDate && new Date(selectedLoan.endDate).toISOString().split('T')[0],
    })

  }, [selectedLoan])


  return (
    <Can permissions={[]} role={'MANAGER'}>
      <Grid overflowY={'hidden'}>
        <TableContainerCustom>
          <Flex justifyContent={'space-between'} align={'center'}>
            <Heading
              mb={6}
              fontSize={['sm', 'lg', '3xl', '4xl']}
              fontWeight={600}
            >Empréstimos</Heading>
            <Button colorScheme={'green'} size={'sm'} onClick={() => {
              setIsEdit(false)
              loanModalOnOpen()
              reset({})
            }}>+ Criar</Button>
          </Flex>
          <Table
            variant='simple'
            colorScheme={'blue'}
            size={'sm'}
          >
            <Thead>
              <Tr>
                <Th>Cliente</Th>
                <Th>Funcionário</Th>
                <Th>Livro</Th>
                <Th>Status</Th>
                <Th>Emprestado em</Th>
                <Th>Previsão</Th>
                <Th isNumeric>Ações</Th>
              </Tr>
            </Thead>
            <Tbody >
              {loans?.map((loan: ILoanProps, index: number) => {
                return (
                  <Tr key={loan.id} >
                    <Td>{loan.clientName}</Td>
                    <Td>{loan.employeeName}</Td>
                    <Td>{loan.bookTitle}</Td>
                    <Td>{loan.status ? 'Emprestado' : 'Devolvido'}</Td>
                    <Td>{new Date(loan.startDate).toLocaleDateString()}</Td>
                    <Td>{new Date(loan.endDate).toLocaleDateString()}</Td>

                    <Td isNumeric>
                      <Flex gap={2} justifyContent={'flex-end'}>
                        <IconButton
                          variant='outline'
                          colorScheme='yellow'
                          aria-label='Edit loan'
                          icon={<Pencil2Icon />}
                          onClick={() => {
                            setSelectedLoan(loan)
                            loanModalOnOpen()
                            setIsEdit(true)
                          }}
                          isLoading={isLoading && loan.id === selectedLoan.id}
                        />
                        <IconButton
                          variant='outline'
                          colorScheme='red'
                          aria-label='Delete loan'
                          icon={<TrashIcon />}
                          onClick={() => {
                            setSelectedLoan(loan)
                            onOpen()
                          }}
                          isLoading={isLoading && loan.id === selectedLoan.id}
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
      </Grid>
      <LoanModal
        control={control}
        isOpen={loanModalIsOpen}
        onClose={loanModalOnClose}
        isEdit={isEdit}
        onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit}
        isLoading={isLoading}
        register={register}
        setValue={setValue}
      />
      <Dialog />
    </Can>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }

})