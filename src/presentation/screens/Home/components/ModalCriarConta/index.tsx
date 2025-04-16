import { View } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { AddAccount } from '@/domain/usecases'

import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ButtonText,
  Box,
  Heading,
  Icon,
  Text,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
  HStack,
  Pressable,
  FormControlError,
  FormControlErrorText,
  ButtonSpinner,
} from '@/presentation/components/ui'
import { useToast } from '@/presentation/hooks'
import IluNovaConta from '@/presentation/assets/cadastro.svg'
import CloseIcon from '@/presentation/assets/close-black.svg'

type Props = {
  addAccount: AddAccount
}

type SignUpData = z.infer<typeof schema>

const schema = z.object({
  name: z
    .string({ message: 'O nome é obrigatório' })
    .min(2, { message: 'O nome deve conter pelo menos 2 caracteres' }),
  email: z
    .string({ message: 'O e-mail é obrigatório' })
    .email({ message: 'Endereço de e-mail inválido' }),
  password: z
    .string({ message: 'A senha é obrigatória' })
    .min(6, { message: 'A senha deve conter pelo menos 6 caracteres' }),
  terms: z.literal<boolean>(true),
})

export function ModalCriarConta({ addAccount }: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const toast = useToast()
  const [showModal, setShowModal] = useState(false)

  const onSignUp = async (data: SignUpData) => {
    const { name, email, password } = data
    try {
      await addAccount.execute({
        name,
        email,
        password,
      })
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast('error', 'Este e-mail já existe.', error.code)
          setError('email', {
            message: 'Este e-mail já existe.',
          })
          break
        default:
          toast('error', 'Ocorreu um erro ao efetuar o cadastro.', error.code)
      }
    }
  }

  return (
    <Box className="flex-1">
      <Button
        testID="open-account-button"
        className="h-12 w-full bg-black rounded-lg"
        onPress={() => setShowModal(true)}
      >
        <ButtonText className="text-md">Abrir conta</ButtonText>
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="lg"
        className="ios:h-full ios:py-20"
      >
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader className="w-full flex justify-end">
            <Text
              onPress={() => {
                setShowModal(false)
              }}
            >
              <Icon
                as={CloseIcon}
                size="sm"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </Text>
          </ModalHeader>

          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <View className="self-center">
              <IluNovaConta width={293} height={216} />
            </View>

            <Heading className="text-left text-lg mt-8">
              Preencha os campos abaixo para criar sua conta corrente!
            </Heading>

            <VStack className="w-full mt-8">
              <FormControl isInvalid={!!errors.name}>
                <FormControlLabel>
                  <FormControlLabelText className="text-md font-bold">
                    Nome
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                      <InputField
                        testID="input-name"
                        className="text-md"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Digite seu nome completo"
                      />
                    </Input>
                  )}
                />
                {errors.name && (
                  <FormControlError testID="error-name">
                    <FormControlErrorText>
                      {errors.name.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormControlLabel className="mt-6">
                  <FormControlLabelText className="font-bold">
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                      <InputField
                        testID="input-email"
                        className="text-md"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Digite seu email"
                      />
                    </Input>
                  )}
                />
                {errors.email && (
                  <FormControlError testID="error-email">
                    <FormControlErrorText>
                      {errors.email.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormControlLabel className="mt-6">
                  <FormControlLabelText className="font-bold">
                    Senha
                  </FormControlLabelText>
                </FormControlLabel>

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                      <InputField
                        testID="input-password"
                        className="text-md"
                        type="password"
                        placeholder="Digite sua senha"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    </Input>
                  )}
                />
                {errors.password && (
                  <FormControlError testID="error-password">
                    <FormControlErrorText>
                      {errors.password.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              <Pressable onPress={() => setValue('terms', !getValues('terms'))}>
                <FormControl isInvalid={!!errors.terms}>
                  <HStack className="items-center gap-4 mt-8">
                    <Controller
                      control={control}
                      name="terms"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          testID="checkbox-terms"
                          color="#47A138"
                          className={`${errors.terms ? '!border-custom-my-dark-red' : '!border-custom-my-green'} !rounded-[5px]`}
                          onValueChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Text className="flex-1 text-md text-black">
                      Li e estou ciente quanto às condições de tratamento dos
                      meus dados conforme descrito na Política de Privacidade do
                      banco.
                    </Text>
                  </HStack>
                </FormControl>
              </Pressable>

              <Button
                testID="submit-button"
                className="h-12 bg-custom-my-orange rounded-lg mt-8"
                onPress={handleSubmit(onSignUp)}
                isDisabled={isSubmitting}
              >
                {isSubmitting && (
                  <ButtonSpinner
                    testID="submit-button-loading"
                    className="text-white"
                  />
                )}
                <ButtonText className="text-md">Criar conta</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
