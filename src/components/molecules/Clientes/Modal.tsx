import { CalendarIcon, EmailIcon } from '@chakra-ui/icons';
import {
    Box, Button, Grid, GridItem,
    Input, InputGroup, InputLeftElement, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select';
import React, { } from 'react'
import { Controller } from 'react-hook-form';
import { RiUser2Line } from 'react-icons/ri';
import { isValid } from '../../../utils/cpfValidator';


interface IUserModalProps {
    isOpen: boolean;
    isEdit: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    control: any;
    register: any;
    setValue: any;
}

export const ClientModal = ({ isOpen, isEdit, setValue, isLoading, onClose, onSubmit, register, control, ...rest }: IUserModalProps) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent bgColor={'gray.800'} borderRadius={19}>
                    <ModalHeader>
                        {isEdit ? 'Edição' : 'Criação'} de cliente
                        <Text fontSize={'14px'} fontWeight={300}>
                            Aqui você {isEdit ? 'edita as informações do cliente.' : 'cria o cliente'}
                        </Text>
                    </ModalHeader>

                    <ModalCloseButton />
                    <Box
                        as={'form'}
                    >
                        <ModalBody>
                            <Grid
                                gap={3}
                                templateColumns={'repeat(2, 1fr)'}
                                gridGap={'1rem'}
                            >
                                <GridItem colSpan={2}>
                                    <Text fontSize={'14px'} mb={2}>Nome</Text>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<RiUser2Line color={'gray.500'} />}
                                        />
                                        <Input
                                            {...register("name")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="Nome do usuário"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>


                                <GridItem>
                                    <Text fontSize={'14px'} mb={2}>CPF</Text>

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        />
                                        <Input
                                            {...register("cpf")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="000.000.000-00"
                                            borderColor={'gray.300'}
                                            onChange={(e) => {
                                                //only numbers
                                                const value = e.target.value.replace(/\D/g, '')
                                                    .replace(/(\d{3})(\d)/, '$1.$2')
                                                    .replace(/(\d{3})(\d)/, '$1.$2')
                                                    .replace(/(\d{3})(\d)/, '$1-$2')
                                                    .replace(/(-\d{2})\d+?$/, '$1')

                                                if (isValid(value))

                                                    setValue("cpf", value)

                                            }}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem>
                                    <Text fontSize={'14px'} mb={2}>Data de nascimento</Text>

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<CalendarIcon color={'gray.500'} />}
                                        />
                                        <Input
                                            {...register("birthdate",)}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="date"
                                            placeholder="12/05/2001"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
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
