import { TextInputProps } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {
  FormControlLabel,
  FormControlLabelText,
  Input as GluestackInput,
  InputField,
  InputSlot,
} from '@/presentation/components/ui'

type Props = TextInputProps & {
  label: string
  type: 'text' | 'password'
}

export function Input({ type, label, ...rest }: Props) {
  return (
    <>
      <FormControlLabel className="mt-6">
        <FormControlLabelText className="text-md text-black font-semibold">
          {label}
        </FormControlLabelText>
      </FormControlLabel>
      <GluestackInput className="h-12 bg-white rounded-lg border border-custom-my-green mt-2">
        <InputField
          type={type}
          className="text-md text-custom-my-placeholder"
          {...rest}
        />
        <InputSlot className="mr-3">
          <MaterialIcons name="edit" color="#444444" size={16} />
        </InputSlot>
      </GluestackInput>
    </>
  )
}
