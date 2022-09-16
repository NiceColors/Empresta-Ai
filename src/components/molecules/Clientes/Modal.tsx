import { CalendarIcon, EmailIcon } from '@chakra-ui/icons';
import {
    Box, Button, FormControl, FormErrorMessage, Grid, GridItem,
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
    control: any;
    formProps: any
}

export const ClientModal = ({ isOpen, isEdit, formProps, isLoading, onClose, control, ...rest }: IUserModalProps) => {


    const { register, formState: { errors }, setValue, getValues, setError, clearErrors } = formProps


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
                                            required
                                            minLength={4}
                                            maxLength={40}
                                            pattern="[a-zA-Z][a-zA-Z0-9\s]*"
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

                                    <FormControl isInvalid={errors.cpf}>
                                        <InputGroup>
                                            <Input
                                                required
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

                                                    setValue("cpf", value)
                                                    if (!isValid(value))
                                                        setError("cpf", { type: "focus" })
                                                    else clearErrors('cpf')

                                                }}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>
                                            {errors.cpf && 'CPF inválido'}
                                        </FormErrorMessage>
                                    </FormControl>
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
                                            required
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="date"
                                            placeholder="12/05/2001"
                                            borderColor={'gray.300'}
                                            max={new Date().toISOString().split("T")[0]}
                                        />
                                    </InputGroup>
                                </GridItem>

                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red.300' size={'sm'} mr={3} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme={'green'} size={'sm'} type={'submit'} isLoading={isLoading}>Salvar</Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}
