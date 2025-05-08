import { useState } from 'react'
import { Platform, PressableProps } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  Text,
} from './ui'
import { formattedDate, formattedDateTime } from '@/presentation/utils'

type Props = PressableProps & {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  hasTime?: boolean
  textColor?: string
}

export function InputDate({
  date,
  setDate,
  className,
  hasTime = false,
  textColor,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false)

  const handleSelectedDate = (
    _event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) {
      setDate(selectedDate)
      if (hasTime) {
        showTimePicker(selectedDate)
      }
    }
  }

  const handleSelectedTime = (
    _event: DateTimePickerEvent,
    selectedTime?: Date,
  ) => {
    if (selectedTime) {
      setDate(selectedTime)
    }
  }

  const showDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        mode: 'date',
        display: 'calendar',
        onChange: handleSelectedDate,
      })
    } else {
      setOpen(true)
    }
  }

  const showTimePicker = (selectedDate: Date) => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      mode: 'time',
      display: 'clock',
      onChange: handleSelectedTime,
    })
  }

  return (
    <>
      <Pressable
        className={`justify-center rounded-lg border border-white h-12 pl-3 ${className}`}
        onPress={showDatePicker}
        {...rest}
      >
        <HStack className="items-center justify-between gap-4">
          <Text
            className={`flex-1 ${textColor ? textColor : 'text-white'} text-sm font-medium`}
            numberOfLines={1}
          >
            {hasTime
              ? formattedDateTime.format(date)
              : formattedDate.format(date)}
          </Text>
          <Feather name="calendar" color="#FFFFFF" size={16} className="mr-2" />
        </HStack>
      </Pressable>

      {Platform.OS === 'ios' && (
        <Modal isOpen={open}>
          <ModalBackdrop onPress={() => setOpen(false)} />
          <ModalContent className="rounded-lg">
            <ModalHeader>
              <ModalCloseButton
                className="flex-1 justify-end items-end"
                onPress={() => setOpen(false)}
              >
                <Icon
                  as={CloseIcon}
                  size="xl"
                  className="text-custom-my-dark-green"
                />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Box>
                <DateTimePicker
                  value={date}
                  mode={hasTime ? 'datetime' : 'date'}
                  display="spinner"
                  onChange={handleSelectedDate}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-custom-my-dark-green rounded-lg"
                onPress={() => setOpen(false)}
              >
                <ButtonText>Confirmar</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
