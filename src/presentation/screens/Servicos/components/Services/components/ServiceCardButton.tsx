import { ComponentProps } from 'react'
import { SvgProps } from 'react-native-svg'

import { Button, ButtonIcon, Text } from '@/presentation/components/ui'

type Props = ComponentProps<typeof Button> & {
  title: string
  Icon: React.FC<SvgProps>
}

export function ServiceCardButton({ title, Icon, ...rest }: Props) {
  return (
    <Button
      className="flex-1 h-full flex-col bg-custom-my-services-card-bg border-2 border-custom-my-services-card-bg active:!text-black active:!border-custom-my-green active:!bg-custom-my-services-card-bg active:! rounded-lg p-6"
      {...rest}
    >
      <ButtonIcon
        as={Icon}
        className="w-[54px] h-[54px] text-typography-[transparent]"
      />
      <Text className="text-black active:!text-black text-md font-bold mt-6">
        {title}
      </Text>
    </Button>
  )
}
