import { CalendarIcon, EmailIcon } from '@chakra-ui/icons';
import {
    Box, Button, Grid, GridItem,
    Input, InputGroup, InputLeftElement, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, Textarea, useOutsideClick
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select';
import React, { useState, useEffect } from 'react'
import { RiUser2Line } from 'react-icons/ri';
import { useDebounce } from '../../../hooks/useDebounce';
import { api } from '../../../services/apiClient';
import { isValid } from '../../../utils/cpfValidator';
import { Controller } from 'react-hook-form';


interface ILoanModalProps {
    isOpen: boolean;
    isEdit: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    control: any;
    register: any;
    setValue: any;
}

export const LoanModal = ({ isOpen, isEdit, setValue, isLoading, onClose, onSubmit, register, control, ...rest }: ILoanModalProps) => {

    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [data, setData] = useState([]);
    const [type, setType] = useState('books');

    useOutsideClick({
        ref: ref,
        handler: () => false,
    })

    async function searchData(page: number = 0, search: string | number | boolean, limit?: number): Promise<any> {

        const { data: response } = await api.get(`/${type}?query=${search}&limit=7`);

        setData(response.data);

    }

    useEffect(() => {
        searchData(page, search);
    }, [debouncedSearch])


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent bgColor={'gray.800'} borderRadius={19}>
                    <ModalHeader>
                        {isEdit ? 'Edição' : 'Criação'} de empréstimo
                        <Text fontSize={'14px'} fontWeight={300}>
                            Aqui você {isEdit ? 'edita as informações do empréstimo.' : 'cria o empréstimo'}
                        </Text>
                    </ModalHeader>

                    <ModalCloseButton />
                    <Box
                        as={'form'}
                    >
                        <ModalBody>
                            <Grid
                                gap={3}
                                templateColumns={'repeat(24, 1fr)'}
                                gridGap={'1rem'}
                            >
                                <GridItem colSpan={12}>
                                    <Text fontSize={'14px'} mb={2}>Cliente</Text>
                                    <Controller
                                        control={control}
                                        name={'clientId'}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, error }
                                        }) => (
                                            <Select
                                                placeholder="Nome do cliente"
                                                name={name}
                                                onInputChange={(e: any) => setSearch(e)}
                                                noOptionsMessage={() => 'Nenhum cliente encontrado'}
                                                size={'md'}
                                                useBasicStyles
                                                options={data.map((client: any) => ({
                                                    value: client.id,
                                                    label: client.name,
                                                }))}
                                                ref={ref}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                onFocus={() => {
                                                    setData([]);
                                                    setType('clients')
                                                }}
                                                value={value}
                                                chakraStyles={{
                                                    option: (provided) => ({
                                                        ...provided,
                                                        //cnange background color
                                                        backgroundColor: '#fff',
                                                        color: '#000',
                                                    }),
                                                    //borderradius
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderRadius: '0.35rem',
                                                    }),
                                                }}
                                            />

                                        )}
                                    />
                                </GridItem>
                                <GridItem colSpan={12}>
                                    <Text fontSize={'14px'} mb={2}>Funcionário</Text>

                                    <Controller
                                        control={control}
                                        name={'employeeId'}

                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, error }
                                        }) => (
                                            <Select
                                                placeholder="Nome do funcionário"
                                                name={name}
                                                onInputChange={(e: any) => setSearch(e)}
                                                noOptionsMessage={() => 'Nenhum cliente encontrado'}
                                                size={'md'}
                                                useBasicStyles
                                                options={data?.map((employee: any) => ({
                                                    value: employee.id,
                                                    label: employee.name,
                                                }))}
                                                ref={ref}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                onFocus={() => {
                                                    setData([]);
                                                    setType('users')
                                                }}
                                                value={value}
                                                chakraStyles={{
                                                    option: (provided) => ({
                                                        ...provided,
                                                        backgroundColor: '#fff',
                                                        color: '#000',
                                                    }),
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderRadius: '0.35rem',
                                                    }),
                                                }}
                                            />

                                        )}
                                    />
                                </GridItem>
                                <GridItem colSpan={12}>
                                    <Text fontSize={'14px'} mb={2}>Data de empréstimo</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                        // eslint-disable-next-line react/no-children-prop
                                        children={<CalendarIcon color={'gray.500'} />}
                                        /> */}
                                        <Input
                                            {...register("startDate",)}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="date"
                                            placeholder="12/05/2001"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={12}>
                                    <Text fontSize={'14px'} mb={2}>Data de devolução</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<CalendarIcon color={'gray.500'} />}
                                        /> */}
                                        <Input
                                            {...register("endDate",)}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="date"
                                            placeholder="12/05/2001"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={24}>
                                    <Text fontSize={'14px'} mb={2}>Livro</Text>
                                    <Controller
                                        control={control}
                                        name={'bookId'}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, error }
                                        }) => (
                                            <Select
                                                placeholder="Nome do livro"
                                                name={name}
                                                colorScheme="green"
                                                tagVariant='solid'
                                                selectedOptionStyle="check"
                                                selectedOptionColor='purple'
                                                onInputChange={(e: any) => setSearch(e)}
                                                isLoading={isLoading}
                                                onFocus={() => {
                                                    setData([]);
                                                    setType('books')
                                                }}
                                                ref={ref}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                noOptionsMessage={() => 'Nenhum livro encontrado'}
                                                size={'md'}
                                                useBasicStyles
                                                options={data.map((book: any) => ({
                                                    value: book.id,
                                                    label: book.title,
                                                }))}
                                                chakraStyles={{
                                                    option: (provided) => ({
                                                        ...provided,
                                                        //cnange background color
                                                        backgroundColor: '#fff',
                                                        color: '#000',
                                                    }),
                                                    //borderradius
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderRadius: '0.35rem',
                                                    }),
                                                }}
                                            />

                                        )}
                                    />
                                </GridItem>

                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red.300' size={'sm'} mr={3} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme={'green'} size={'sm'} onClick={onSubmit} isLoading={isLoading}>Salvar</Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}
