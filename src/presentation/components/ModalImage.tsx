import { useState } from 'react'
import {
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Pressable,
} from './ui'

type Props = {
  uri: string
}

export function ModalImage({ uri }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Pressable onPress={() => setIsOpen(true)}>
        <Image
          size="xs"
          className="rounded-md object-cover"
          source={{
            uri,
          }}
          alt="image"
        />
      </Pressable>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalBackdrop />
        <ModalContent className="p-0">
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
            className="m-0"
          >
            <Image
              height={500}
              className="h-[500px] w-full"
              source={{
                uri,
              }}
              alt="image"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
