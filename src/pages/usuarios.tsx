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
import { ButtonTable } from '../components/atoms/ButtonTable/Index'
import { TableContainerCustom } from '../components/atoms/Containers/TableContainer';
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
    birthdate: Date | string;
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


export default function Usuarios() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUserProps>({} as IUserProps)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: userModalIsOpen, onOpen: userModalOnOpen, onClose: userModalOnClose } = useDisclosure()
    const [isEdit, setIsEdit] = useState(false)


    const { handleSubmit, reset, register, setValue, control, formState: { errors }, setError } = useForm<FormValues>()
    const [page, setPage] = useState<number | null>(0)
    const { data: response, isFetching, error } = useFetch('/users?limit=8', {
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
            const { data } = await api.delete(`/users`, {
                data: {
                    id: selectedUser.id
                }
            })
            const deleteMessage = data?.message ?? 'O usuário selecionado foi deletado com sucesso.'
            toast({
                title: `Usuário deletado`,
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

    const handleEditSubmit = handleSubmit(async (values) => {
        try {
            const { data: response } = await api.put(`/users`, {
                ...values,
                permissions: values.permissions.map(item => item.value)
            })
            const editMessage = response?.message ?? 'O usuário selecionado foi editado com sucesso.'
            toast({
                title: `Usuário editado`,
                description: editMessage,
                status: 'success',
                isClosable: true,
                duration: 5000,
            })
            userModalOnClose()
        } catch (error) {
            toast({
                title: `Error ao editar o usuário`,
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
            const { data: response } = await api.post(`/users`, {
                ...values,
                birthdate: new Date(),
                permissions: values.permissions.map(item => item.value).join(",")
            })
            const createMessage = response?.message ?? 'O usuário selecionado foi criado com sucesso.'
            toast({
                title: `Usuário criado`,
                description: createMessage,
                status: 'success',
                isClosable: true,
                duration: 5000,
            })
            userModalOnClose()
        } catch (error) {
            toast({
                title: `Error ao criar o usuário`,
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
                            Deletar usuário
                        </AlertDialogHeader>

                        <AlertDialogBody color={'red.400'}>
                            Tem certeza de que deseja deletar este usuário?
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

        console.log(selectedUser.birthdate)

        reset({
            ...selectedUser,
            birthdate: selectedUser.birthdate && new Date(selectedUser.birthdate).toISOString().split('T')[0],
            cpf: cpfMask(selectedUser.cpf)
        })

    }, [selectedUser])

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
                        >Usuários do Sistema</Heading>
                        <Button colorScheme={'green'} size={'sm'} onClick={() => {
                            setIsEdit(false)
                            userModalOnOpen()
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
                                <Th>Nome</Th>
                                <Th>Email</Th>
                                <Th>Cargo</Th>
                                <Th>CPF</Th>
                                <Th>Data de nascimento</Th>
                                <Th isNumeric>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {data?.map((user: IUserProps, index: number) => {
                                return (
                                    <Tr key={user.id} >
                                        <Td>{user.name.split(' ').slice(0, 2).join(' ')}</Td>
                                        <Td>{user.email}</Td>
                                        <Td><Badge {...user.role === 'MANAGER' && { colorScheme: 'purple' }}>{roles[user.role]}</Badge></Td>
                                        <Td>{cpfMask(user.cpf).slice(0, 14)}</Td>
                                        <Td>{new Date(user.birthdate).toLocaleDateString()}</Td>
                                        <Td isNumeric>
                                            <Flex gap={2} justifyContent={'flex-end'}>

                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='yellow'
                                                    aria-label='Edit user'
                                                    icon={<Pencil2Icon />}
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        userModalOnOpen()
                                                        setIsEdit(true)
                                                    }}
                                                    isLoading={isLoading && user.id === selectedUser.id}
                                                />
                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='red'
                                                    aria-label='Delete user'
                                                    icon={<TrashIcon />}
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        onOpen()
                                                    }}
                                                    isLoading={isLoading && user.id === selectedUser.id}
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
                <UserModal
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