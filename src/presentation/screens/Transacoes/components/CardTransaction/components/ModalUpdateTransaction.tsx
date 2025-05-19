import { useState } from 'react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Feather from '@expo/vector-icons/Feather'
import MaskInput, { Masks } from 'react-native-mask-input'
import { Timestamp } from 'firebase/firestore'

import { useToast } from '@/presentation/hooks'
import { TransactionModel, TransactionType } from '@/domain/models/transaction'
import { TransactionDocumentModel } from '@/domain/models/transaction-document'
import {
  Button,
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
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { InputDate, ModalImage } from '@/presentation/components'
import Pencil from '@/presentation/assets/lapis.svg'
import Close from '@/presentation/assets/close-black.svg'
import ArrowDropdown from '@/presentation/assets/arrow-dropdown.svg'
// import { Transaction, TransactionDocument, TransactionType } from '@/models'
import { formattedMoney } from '@/presentation/utils'
// import { useTransaction } from '@/contexts'

type Props = {
  transaction: TransactionModel<Timestamp> & {
    documents?: TransactionDocumentModel[]
    type: string
  }
}

type UpdateTransactionData = z.infer<typeof schema>

const schema = z.object({
  transactionType: z.nativeEnum(TransactionType).nullish(),
  value: z
    .string()
    .min(1, 'O valor é obrigatório')
    .refine((value) => {
      const numericValue = Number(
        value.replace(/[^0-9,]/g, '').replace(',', '.'),
      )
      return numericValue >= 1
    }, 'O valor mínimo é R$1,00')
    .nullish(),
})

export function ModalUpdateTransaction({ transaction }: Props) {
  // const { updateTransaction } = useTransaction()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionType: transaction.transactionType,
      value: formattedMoney.format(transaction.value),
    },
  })
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(transaction.date.toDate())

  const onUpdateTransaction = async (data: UpdateTransactionData) => {
    try {
      console.log('data', data)
      // const { transactionType, value } = data
      // const numericValue = Number(
      //   value!.replace(/[^0-9,]/g, '').replace(',', '.'),
      // )
      // await updateTransaction(transaction.id!, {
      //   transactionType: transactionType!,
      //   value: numericValue,
      //   date,
      // })

      toast('success', 'Transação atualizada com sucesso!')
      setIsOpen(false)
    } catch (error) {
      toast('error', 'Ocorreu um erro ao atualizar a transação', error.code)
    }
  }

  return (
    <>
      <Button
        testID="edit-button"
        className="h-12 w-12 bg-custom-my-dark-green rounded-full p-0"
        onPress={() => setIsOpen(true)}
      >
        <Pencil />
      </Button>
      <Modal
        testID="modal-update-transaction"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading className="text-lg">Editar transação</Heading>
            <ModalCloseButton>
              <Close />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <FormControl className="mt-4">
              <Controller
                control={control}
                name="transactionType"
                render={({ field: { onChange, value } }) => (
                  <Select
                    initialLabel={transaction.transactionType}
                    selectedValue={value}
                    onValueChange={onChange}
                  >
                    <SelectTrigger
                      variant="outline"
                      size="xl"
                      className="h-12 bg-white border border-custom-my-dark-green rounded-lg"
                    >
                      <SelectInput
                        className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        placeholder="Selecione o tipo de transação"
                      />
                      <SelectIcon
                        className="mr-3"
                        size="sm"
                        as={ArrowDropdown}
                      />
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
                  <FormControlErrorText>
                    {errors.transactionType.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl className="mt-4">
              <FormControlLabel>
                <FormControlLabelText className="text-md text-black">
                  Data da transação
                </FormControlLabelText>
              </FormControlLabel>
              <InputDate
                className="bg-white border border-custom-my-dark-green text-black"
                textColor="text-black"
                date={date}
                setDate={setDate}
                hasTime
              />
            </FormControl>

            <FormControl className="mt-4" isInvalid={!!errors.value}>
              <FormControlLabel>
                <FormControlLabelText className="text-md text-black">
                  Valor
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="value"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white border border-custom-my-dark-green rounded-lg">
                    <MaskInput
                      testID="edit-transaction-value"
                      value={value!}
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
                  <FormControlErrorText>
                    {errors.value.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {transaction.documents && transaction.documents.length > 0 && (
              <VStack className="gap-1 mt-4">
                <Text className="text-md text-black">
                  Documentos relacionados
                </Text>
                <HStack className="border border-dashed border-custom-my-dark-green items-center gap-2 rounded-lg p-2">
                  {transaction.documents?.map((document) =>
                    document.mimeType.includes('image') ? (
                      <ModalImage key={document.url} uri={document.url} />
                    ) : (
                      <Feather key={document.url} name="file-text" size={32} />
                    ),
                  )}
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              testID="submit-button"
              className="flex-1 h-12 bg-custom-my-dark-green rounded-lg"
              variant="solid"
              onPress={handleSubmit(onUpdateTransaction)}
              isDisabled={isSubmitting}
            >
              {isSubmitting && <ButtonSpinner className="text-white" />}
              <ButtonText className="text-md">Editar transação</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
