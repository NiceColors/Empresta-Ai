import { CalendarIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
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

export const UserModal = ({ isOpen, isEdit, formProps, isLoading, onClose, control, ...rest }: IUserModalProps) => {

    const options = [
        {
            label: "Usuários",
            value: "users",
            colorScheme: "red",
        },
        {
            label: "Livros",
            value: "books",
            colorScheme: "blue",
        },
        {
            label: "Emprestimos",
            value: "emprestimos",
            colorScheme: "green",
        },
        {
            label: "Clientes",
            value: "clientes",
            colorScheme: "yellow",
        }
    ]


    const { register, formState: { errors }, setValue, getValues, setError, clearErrors } = formProps

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent bgColor={'gray.800'} borderRadius={19}>
                    <ModalHeader>
                        {isEdit ? 'Edição' : 'Criação'} de usuário
                        <Text fontSize={'14px'} fontWeight={300}>
                            Aqui você {isEdit ? 'edita as informações do usuário.' : 'cria o usuário'}
                        </Text>
                    </ModalHeader>

                    <ModalCloseButton />
                    <Box
                        as={'form'}
                    >
                        <ModalBody>
                            <Grid
                                gap={3}
                                templateColumns={'1fr 1fr'}
                                gridGap={'1rem'}
                            >
                                <GridItem>
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
                                    <Text fontSize={'14px'} mb={2}>Email</Text>

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        />
                                        <Input
                                            required
                                            {...register("email")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="email"
                                            placeholder="email@exemplo.com"
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
                                            required
                                            {...register("birthdate",)}
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


                                <GridItem>
                                    <Text fontSize={'14px'} mb={2}>Senha</Text>

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<LockIcon color={'gray.500'} />}
                                        />
                                        <Input
                                            required
                                            {...register("password", {
                                                required: 'Esse campo é obrigatório'
                                            })}
                                            min={9}
                                            max={100}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="password"
                                            placeholder="******"
                                            borderColor={'gray.300'}
                                        />

                                    </InputGroup>
                                </GridItem>

                                <GridItem>
                                    <Text fontSize={'14px'} mb={2}>Confirmação da senha</Text>

                                    <FormControl isInvalid={errors.conf_pass}>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none'
                                                // eslint-disable-next-line react/no-children-prop
                                                children={<LockIcon color={'gray.500'} />}
                                            />
                                            <Input
                                                required
                                                {...register("conf_pass", {
                                                    required: 'Esse campo é obrigatório'
                                                })}
                                                errorBorderColor='red.300'
                                                focusBorderColor='green.200'
                                                variant="outline"
                                                type="password"
                                                placeholder="******"
                                                minLength={9}
                                                maxLength={100}
                                                borderColor={'gray.300'}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    if (getValues("password") !== value) setError("conf_pass", { type: 'focus' })
                                                }}
                                            />

                                        </InputGroup>
                                        <FormErrorMessage>
                                            {errors.conf_pass && 'As senhas são diferentes'}
                                        </FormErrorMessage>
                                    </FormControl>
                                </GridItem>




                                <GridItem colSpan={2}>
                                    <Text fontSize={'14px'} mb={2}>Cargo</Text>

                                    <Controller
                                        name={'role'}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <RadioGroup
                                                onChange={onChange}
                                                value={value}
                                            >
                                                <Stack spacing={5} direction='row'>
                                                    <Radio colorScheme='red' value='MANAGER'>
                                                        Gerente
                                                    </Radio>
                                                    <Radio colorScheme='green' value='INTERN' defaultChecked>
                                                        Interno
                                                    </Radio>
                                                </Stack>
                                            </RadioGroup>
                                        )}
                                    />

                                </GridItem>

                                <GridItem colSpan={2}>
                                    <Text fontSize={'14px'} mb={2}>Permissões</Text>

                                    <Controller
                                        name={'permissions'}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                colorScheme="green"
                                                tagVariant='solid'
                                                selectedOptionStyle="check"
                                                selectedOptionColor='purple'
                                                isMulti
                                                useBasicStyles
                                                placeholder="Selecione as permissões..."
                                                onChange={onChange}
                                                chakraStyles={{
                                                    option: (provided) => ({
                                                        ...provided,
                                                        //cnange background color
                                                        backgroundColor: '#fff',
                                                        color: '#000',
                                                    })
                                                }}
                                                // defaultValue={options.filter(option => value && value?.split('')?.includes(option.value))}
                                                options={options}
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
                            <Button colorScheme={'green'} size={'sm'} type={'submit'} isLoading={isLoading}>Salvar</Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}
