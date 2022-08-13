import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, Link, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import React, { useContext } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuest'


type FormValues = {
  email: string;
  password: string;
}

const Login: NextPage = () => {


  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>()

  const { signIn } = useContext(AuthContext)


  const onSubmit = handleSubmit(async (data) => await signIn(data))


  return (
    <Box minH={'100vh'}>
      <Flex w="100%" maxW="1400px" m="0 auto" alignItems="center" py={8}>
        <Box w={12} h={12} borderRadius={'100%'} bgColor={'green.500'} mr={4} /> <Heading color="green.900">Empresta Aí</Heading>
      </Flex>

      <Grid maxW="1400px" w="100%" m="0 auto" mt={6} px={6} alignItems={'center'} justifyContent='center' templateColumns={{ base: 'none', lg: '1fr 1.3fr' }} gap={6} >
        <GridItem maxW={{ base: '400px', lg: "400px" }} gap={'1em'} w="100%" >
          <Text color="gray.600" fontWeight={'light'} fontSize="1.2rem">Bem vindo de volta</Text>

          <Heading
            mb={4}
            fontSize={'clamp(2rem,4vw, 3rem)'}
            color="green.900"
            fontWeight={700}
            position='relative'
            maxW={{ lg: "300px" }}
          >
            Faça login na plataforma <Text as="span" color="green.300">.</Text>
          </Heading>

          <Flex flexDirection={'column'} as="form" autoComplete='off' onSubmit={onSubmit} gap={3}>
            <FormControl isInvalid={!!errors?.email} isRequired={true}>
              <Input  {...register("email", { required: true })} id="email" errorBorderColor='red.300' focusBorderColor='green.200' variant="filled" type="email" placeholder="email@exemplo.com" h={'49px'} />
              {errors?.email && <Text color="red.400">Campo obrigatório</Text>}
            </FormControl>
            <FormControl isInvalid={!!errors?.password} isRequired={true}>
              <Input {...register("password", { required: true })} id="password" errorBorderColor='red.300' focusBorderColor='green.200' variant="filled" type="password" placeholder="******" h={'49px'} />
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
                color="#fff">Entrar</Button>
            </Flex>
          </Flex>

        </GridItem>
        <GridItem display={{ base: 'none', lg: 'block' }}>
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