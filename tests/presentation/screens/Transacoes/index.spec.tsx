import { render, screen } from '@testing-library/react-native'

import { LoadTransactionsMock } from '@tests/domain/usecases/transaction'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Transacoes } from '@/presentation/screens'

jest.mock('nativewind', () => {
  const setColorSchemeMock = jest.fn()

  return {
    useColorScheme: () => ({
      colorScheme: 'light',
      setColorScheme: setColorSchemeMock,
    }),
    vars: jest.fn(),
    cssInterop: jest.fn(),
  }
})

jest.mock('firebase/firestore', () => ({
  Timestamp: jest.fn(),
}))

jest.mock('expo-font')

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}))

describe('<Transacoes />', () => {
  it('should show the extract empty message if there are no transactions', () => {
    const loadTransactions = new LoadTransactionsMock()
    render(
      <GluestackUIProvider>
        <Transacoes loadTransactions={loadTransactions} />
      </GluestackUIProvider>,
    )

    expect(screen.getAllByText('Nenhuma transação para mostrar.')).toBeTruthy()
  })
})
