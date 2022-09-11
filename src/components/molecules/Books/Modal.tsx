import { CalendarIcon, EmailIcon } from '@chakra-ui/icons';
import {
    Box, Button, Grid, GridItem,
    Input, InputGroup, InputLeftElement, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, Textarea
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select';
import React, { } from 'react'
import { Controller } from 'react-hook-form';
import { RiUser2Line } from 'react-icons/ri';
import { isValid } from '../../../utils/cpfValidator';


interface IBookModalProps {
    isOpen: boolean;
    isEdit: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    control: any;
    register: any;
    setValue: any;
}

export const BookModal = ({ isOpen, isEdit, setValue, isLoading, onClose, onSubmit, register, control, ...rest }: IBookModalProps) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent bgColor={'gray.800'} borderRadius={19}>
                    <ModalHeader>
                        {isEdit ? 'Edição' : 'Criação'} de livro
                        <Text fontSize={'14px'} fontWeight={300}>
                            Aqui você {isEdit ? 'edita as informações do livro.' : 'cria o livro'}
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
                                    <Text fontSize={'14px'} mb={2}>Titulo</Text>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<RiUser2Line color={'gray.500'} />}
                                        />
                                        <Input
                                            {...register("title")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="Nome do livro"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={12}>
                                    <Text fontSize={'14px'} mb={2}>Autor</Text>

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        />
                                        <Input
                                            {...register("author")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="Victor Batista"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={12}>
                                    <Text fontSize={'14px'} mb={2}>Data de publicação</Text>

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<CalendarIcon color={'gray.500'} />}
                                        />
                                        <Input
                                            {...register("releaseYear",)}
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
                                    <Text fontSize={'14px'} mb={2}>ISBN-10</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        /> */}
                                        <Input
                                            {...register("isbn")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="9999999999"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={24}>
                                    <Text fontSize={'14px'} mb={2}>URL do Banner</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        /> */}
                                        <Input
                                            {...register("bannerUrl")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="url"
                                            placeholder="..."
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={21}>
                                    <Text fontSize={'14px'} mb={2}>Editora</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        /> */}
                                        <Input
                                            {...register("publisher")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="000.000.000-00"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Text fontSize={'14px'} mb={2}>Páginas</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        /> */}
                                        <Input
                                            {...register("pages")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="number"
                                            placeholder="999"
                                            borderColor={'gray.300'}
                                        />
                                    </InputGroup>
                                </GridItem>
                                <GridItem colSpan={24}>
                                    <Text fontSize={'14px'} mb={2}>Sinopse</Text>

                                    <InputGroup>
                                        {/* <InputLeftElement
                                            pointerEvents='none'
                                            // eslint-disable-next-line react/no-children-prop
                                            children={<EmailIcon color={'gray.500'} />}
                                        /> */}
                                        <Textarea
                                            {...register("synopsis")}
                                            errorBorderColor='red.300'
                                            focusBorderColor='green.200'
                                            variant="outline"
                                            type="text"
                                            placeholder="Lorem ipsum"
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
