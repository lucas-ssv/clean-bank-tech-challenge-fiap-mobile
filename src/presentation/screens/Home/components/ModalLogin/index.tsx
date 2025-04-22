import { View } from 'react-native'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'

import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Box,
  Button,
  ButtonText,
  Heading,
  Icon,
  Text,
  Input,
  InputField,
  VStack,
  FormControlError,
  FormControlErrorText,
  ButtonSpinner,
} from '@/presentation/components/ui'
import BannerLogin from '@/presentation/assets/login.svg'
import CloseIcon from '@/presentation/assets/close-black.svg'
import { useToast } from '@/presentation/hooks'

type LoginData = z.infer<typeof schema>

const schema = z.object({
  email: z
    .string({ message: 'O e-mail é obrigatório' })
    .email({ message: 'Endereço de e-mail inválido' }),
  password: z
    .string({ message: 'A senha é obrigatória' })
    .min(6, { message: 'A senha deve conter pelo menos 6 caracteres' }),
})

export function ModalLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const toast = useToast()
  const [showModal, setShowModal] = useState(false)

  const onLogin = async (data: LoginData) => {
    // const { email, password } = data
    try {
      // await login(email, password)
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          toast('error', 'E-mail ou senha inválidas.', error.code)
          break
        default:
          toast('error', 'Ocorreu um erro ao efetuar o login.', error.code)
      }
    }
  }

  return (
    <Box className="flex-1">
      <Button
        testID="login-button"
        variant="outline"
        className="h-12 w-full border-2 border-black rounded-lg"
        onPress={() => setShowModal(true)}
      >
        <ButtonText className="text-md text-black">Já tenho conta</ButtonText>
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
              <BannerLogin width={293} height={216} />
            </View>

            <Heading className="text-center mt-8">Login</Heading>

            <VStack className="w-full mt-8">
              <FormControl isInvalid={!!errors.email}>
                <FormControlLabel>
                  <FormControlLabelText className="text-md font-bold">
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                      <InputField
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
                  <FormControlError>
                    <FormControlErrorText testID="error-email-login">
                      {errors.email.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormControlLabel className="mt-6">
                  <FormControlLabelText className="text-md font-bold">
                    Senha
                  </FormControlLabelText>
                </FormControlLabel>

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="h-12 bg-white border border-custom-my-input-border rounded-lg mt-2">
                      <InputField
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
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.password.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              <Button variant="link" className="self-start mt-2">
                <ButtonText className="text-md !font-body text-custom-my-green underline">
                  Esqueci a senha!
                </ButtonText>
              </Button>
              <Button
                testID="submit-button-login"
                className="h-12 bg-custom-my-orange rounded-lg mt-8"
                onPress={handleSubmit(onLogin)}
                isDisabled={isSubmitting}
              >
                {isSubmitting && <ButtonSpinner className="text-white" />}
                <ButtonText className="text-md">Entrar</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
