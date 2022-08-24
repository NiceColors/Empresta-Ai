import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, InputGroup, InputLeftElement, Link, Text, useToast } from '@chakra-ui/react'
import { LockClosedIcon } from '@radix-ui/react-icons'
import type { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import React, { useContext, useState } from 'react'
import { appendErrors, Resolver, useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuest'


type FormValues = {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const toast = useToast()


  const { handleSubmit, register, formState: { errors }, setError } = useForm<FormValues>()

  const { signIn } = useContext(AuthContext)
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setSubmitLoading(true)
    try {
      await signIn(data)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? 'Tente novamente mais tarde'
      toast({
        title: `${errorMessage}`,
        status: 'error',
        isClosable: true,
        position: 'top'
      })
    } finally {
      setSubmitLoading(false)
    }

  })


  return (
    <Box minH={'100vh'} px={{ base: 2, sm: 8 }}>
      <Flex w="100%" maxW="1440px" m="0 auto" ml={4} alignItems="center" py={8}>
        <Box w={12} h={12} borderRadius={'100%'} bgColor={'green.500'} mr={4} /> <Heading color="green.50">Empresta Aí</Heading>
      </Flex>

      <Grid
        maxW="1400px" w="100%" m="0 auto"
        mt={6} px={6} alignItems={'center'} justifyContent='center'
        templateColumns={{ base: 'none', lg: '1fr 1fr' }} gap={32}
      >


        <GridItem maxW={{ base: '400px', lg: "400px" }} w="100%" >
          <Text color="gray.50" fontWeight={'light'} fontSize="1.2rem">Bem vindo de volta</Text>

          <Heading
            mb={12}
            fontSize={'clamp(2rem,4vw, 4rem)'}
            color="gray.50"
            fontWeight={700}
            position='relative'
            maxW={{ lg: "600px" }}
          >
            Faça <Text as={'span'} color={'green.400'}>login</Text> na plataforma
          </Heading>

          <Flex flexDirection={'column'} as="form" autoComplete='off' onSubmit={onSubmit} gap={3}>
            <FormControl isInvalid={!!errors?.email} isRequired={true} mb={2}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  // eslint-disable-next-line react/no-children-prop
                  children={<EmailIcon color={'gray.500'} />}
                />
                <Input
                  {...register("email", { required: true })}
                  id="email" errorBorderColor='red.300'
                  focusBorderColor='green.200'
                  variant="outline"
                  type="email"
                  placeholder="email@exemplo.com"
                  borderColor={'gray.300'}
                />
              </InputGroup>
              {errors?.email && <Text color="red.400">Campo obrigatório</Text>}
            </FormControl>
            <FormControl isInvalid={!!errors?.password} isRequired={true}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  // eslint-disable-next-line react/no-children-prop
                  children={<LockIcon color={'gray.500'} />}
                />
                <Input
                  {...register("password", { required: true })}
                  id="password"
                  errorBorderColor='red.300'
                  focusBorderColor='green.200' variant="outline"
                  type="password"
                  placeholder="****************"
                />
              </InputGroup>
              {errors?.email && <Text color="red.400">Campo obrigatório</Text>}
            </FormControl>
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Link fontSize={'1rem'}>Esqueci minha senha</Link>
              <Button
                bgColor="green.500"
                colorScheme={'green'}
                type="submit"
                fontWeight={500}
                w="120px"
                isLoading={submitLoading}
                color="#fff">Entrar</Button>
            </Flex>
          </Flex>

        </GridItem>
        <GridItem
          display={{ base: 'none', lg: 'block' }}
          pos={'relative'}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#4d596914',
            borderRadius: '100%',
            zIndex: -1,
            filter: 'blur(15px)'
          }}
        >
          <Image src="/assets/Hero.svg" />
        </GridItem>

      </Grid>
    </Box>
  )
}

export default Login

export const getServerSideProps = withSSRGuest(async (ctx) => {

  return {
    props: {

    }
  }
})