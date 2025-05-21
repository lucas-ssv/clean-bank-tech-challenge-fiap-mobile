import { Alert } from 'react-native'
import { ComponentProps, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import MaskInput, { Masks } from 'react-native-mask-input'
import Feather from '@expo/vector-icons/Feather'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Timestamp } from 'firebase/firestore'

import {
  Box,
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Divider,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Input,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@/presentation/components/ui'
import Pixels from '@/presentation/assets/pixels-servicos.svg'
import Illustration from '@/presentation/assets/ilustracao2.svg'
import ArrowDropdown from '@/presentation/assets/arrow-dropdown.svg'
import File from '@/presentation/assets/file.svg'
import { ModalImage } from '@/presentation/components'
import { useToast } from '@/presentation/hooks'
import { AddTransaction, TransactionType } from '@/domain/usecases/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'
import { useAuth } from '@/presentation/hooks'

type Props = ComponentProps<typeof Box> & {
  addTransaction: AddTransaction
}

type CreateTransactionData = z.infer<typeof schema>

const schema = z.object({
  transactionType: z.nativeEnum(TransactionType, {
    message: 'O tipo da transação é obrigatório',
  }),
  value: z
    .string({ message: 'O valor é obrigatório' })
    .min(1, 'O valor é obrigatório')
    .refine((value) => {
      const numericValue = Number(
        value.replace(/[^0-9,]/g, '').replace(',', '.'),
      )
      return numericValue >= 1
    }, 'O valor mínimo é R$1,00'),
})

export function NewTransaction({ addTransaction, className, ...rest }: Props) {
  const { user } = useAuth()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const [transactionDocuments, setTransactionDocuments] = useState<
    Omit<TransactionDocumentModel, 'transactionId'>[]
  >([])

  const handlePickerDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      })

      if (result.canceled) return

      const assets = result.assets
      if (assets && assets.length > 0) {
        for (const asset of assets) {
          const assetInfo = await FileSystem.getInfoAsync(asset.uri)
          if (assetInfo.exists) {
            const assetSizeInMb = assetInfo.size / (1024 * 1024)
            const limitSize = 10

            if (assetSizeInMb > limitSize) {
              return Alert.alert(
                'Tamanho excedido',
                `O tamanho máximo de arquivo é de até ${limitSize}MB`,
              )
            }

            setTransactionDocuments((prevState) => [
              ...prevState,
              {
                fileName: asset.name,
                url: assetInfo.uri,
                mimeType: asset.mimeType!,
              },
            ])
          }
        }
      }
    } catch (error) {
      toast('error', 'Ocorreu um erro ao inserir o(s) documento(s)', error.code)
    }
  }

  const onCreateTransaction = async (data: CreateTransactionData) => {
    try {
      const { transactionType, value } = data
      const numericValue = Number(
        value.replace(/[^0-9,]/g, '').replace(',', '.'),
      )

      await addTransaction.execute({
        userUID: user?.userUID!,
        date: Timestamp.now().toDate(),
        transactionType,
        value: numericValue,
        transactionDocuments,
      })

      toast('success', 'Transação realizada com sucesso!')
      clearTransactionData()
    } catch (error) {
      toast('error', 'Ocorreu um erro ao realizar a transação.', error.code)
    }
  }

  const clearTransactionData = () => {
    reset()
    setTransactionDocuments([])
  }

  const handleRemoveDocument = (documentUri: string) => {
    const newTransactionDocuments = transactionDocuments.filter(
      (document) => document.url !== documentUri,
    )
    setTransactionDocuments(newTransactionDocuments)
  }

  return (
    <Box
      className={`min-h-[655px] bg-custom-my-gray-box py-8 px-4 rounded-lg overflow-hidden mt-6 ${className}`}
      {...rest}
    >
      <Pixels
        style={{
          position: 'absolute',
        }}
      />
      <Pixels
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: [{ rotate: '180deg' }],
        }}
      />
      <Heading className="text-black text-center text-xl font-heading">
        Nova transação
      </Heading>
      <FormControl className="mt-8" isInvalid={!!errors.transactionType}>
        <Controller
          control={control}
          name="transactionType"
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger
                testID="transaction-type"
                variant="outline"
                size="xl"
                className="h-12 bg-white border border-custom-my-dark-green rounded-lg"
              >
                <SelectInput
                  className="flex-1 text-md placeholder:text-custom-my-placeholder"
                  placeholder="Selecione o tipo de transação"
                />
                <SelectIcon className="mr-3" size="sm" as={ArrowDropdown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <Heading className="text-md my-4">
                    Escolha o tipo de transação
                  </Heading>
                  <Divider />
                  <SelectItem label="Câmbio de moeda" value="cambio" />
                  <SelectItem label="DOC/TED" value="doc/ted" />
                  <SelectItem
                    label="Empréstimo e Financiamento"
                    value="emprestimo"
                  />
                  <SelectItem label="Depósito" value="deposito" />
                  <SelectItem label="Débito" value="debito" />
                  <SelectItem label="Crédito" value="credito" />
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.transactionType && (
          <FormControlError>
            <FormControlErrorText testID="transaction-type-error">
              {errors.transactionType.message}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <VStack>
        <FormControl isInvalid={!!errors.value}>
          <FormControlLabel className="justify-center mt-4">
            <FormControlLabelText className="text-md font-semibold">
              Valor
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg mt-2">
                <MaskInput
                  testID="input-value"
                  value={value}
                  placeholder="R$ 0,00"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    flex: 1,
                    height: '100%',
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                  mask={Masks.BRL_CURRENCY}
                />
              </Input>
            )}
          />
          {errors.value && (
            <FormControlError>
              <FormControlErrorText testID="input-value-error">
                {errors.value.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl>
          <FormControlLabel className="justify-center mt-4">
            <FormControlLabelText className="text-md font-semibold">
              Documentos relacionados
            </FormControlLabelText>
          </FormControlLabel>
          <Button
            className="h-auto flex-col bg-white active:!bg-custom-my-services-card-bg rounded-lg border border-dashed border-custom-my-dark-green p-6 mt-2"
            onPress={handlePickerDocument}
          >
            <ButtonIcon
              as={File}
              className="h-8 w-8 fill-custom-my-dark-green"
            />
            <Box className="flex flex-col items-center">
              <Text className="text-md font-medium text-custom-my-dark-green">
                Escolher documentos
              </Text>
              <Text className="text-sm text-center leading-5 font-body text-custom-my-gray mt-1">
                (Opcional) {'\n'} Selecione recibos ou documentos relacionado a
                transação.
              </Text>
            </Box>
          </Button>
        </FormControl>

        {transactionDocuments.map((document) => (
          <Box
            testID="card-document"
            key={document.url}
            className="bg-custom-my-light-gray rounded-lg p-2 pr-4 mt-2"
          >
            <HStack className="items-center justify-between">
              <HStack className="items-center gap-4">
                {document.mimeType.includes('image') ? (
                  <ModalImage uri={document.url} />
                ) : (
                  <Feather name="file-text" size={24} />
                )}
                <Text className="text-sm text-custom-my-gray font-body">
                  {document.fileName}
                </Text>
              </HStack>
              <Button
                variant="link"
                onPress={() => handleRemoveDocument(document.url)}
              >
                <Feather name="x" size={24} color="#000000" />
              </Button>
            </HStack>
          </Box>
        ))}

        <Button
          testID="submit-button"
          className="h-12 bg-custom-my-dark-green rounded-lg mt-8"
          onPress={handleSubmit(onCreateTransaction)}
          isDisabled={isSubmitting}
        >
          {isSubmitting && (
            <ButtonSpinner
              testID="loading-finish-transation"
              className="text-white"
            />
          )}
          <ButtonText className="text-white text-md font-semibold">
            Concluir transação
          </ButtonText>
        </Button>
      </VStack>
      <Illustration
        style={{
          marginTop: 32,
          alignSelf: 'center',
          marginHorizontal: 16,
        }}
      />
    </Box>
  )
}
