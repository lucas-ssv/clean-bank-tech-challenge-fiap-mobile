import { render, screen, waitFor } from '@testing-library/react-native'
import { Timestamp } from 'firebase/firestore'

import { LoadTransactionsMock } from '@tests/domain/usecases/transaction'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Transacoes } from '@/presentation/screens'
import { TransactionType } from '@/domain/models/transaction'

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
  Timestamp: {
    now: jest.fn().mockReturnValue({
      toDate: jest.fn().mockReturnValue(new Date('2025-05-17T23:59:59Z')),
    }),
  },
}))

jest.mock('expo-font')

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}))

describe('<Transacoes />', () => {
  it('should show the extract empty message if there are no transactions', async () => {
    const loadTransactionsMock = new LoadTransactionsMock()
    jest.spyOn(loadTransactionsMock, 'execute').mockResolvedValue([])
    render(
      <GluestackUIProvider>
        <Transacoes loadTransactions={loadTransactionsMock} />
      </GluestackUIProvider>,
    )

    await waitFor(() => {
      expect(
        screen.getAllByText('Nenhuma transação para mostrar.'),
      ).toBeTruthy()
    })
  })

  it('should show the extract with transactions', async () => {
    const loadTransactionsMock = new LoadTransactionsMock()
    jest.spyOn(loadTransactionsMock, 'execute').mockResolvedValue([
      {
        id: 'any_id',
        date: Timestamp.now() as any,
        transactionType: TransactionType.CAMBIO_DE_MOEDA,
        userUID: 'any_user_uid',
        value: 100,
        documents: [
          {
            fileName: 'any_file_name',
            mimeType: 'any_mime_type',
            url: 'any_url',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    render(
      <GluestackUIProvider>
        <Transacoes loadTransactions={loadTransactionsMock} />
      </GluestackUIProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('card-transaction')).toBeTruthy()
      expect(screen.getByTestId('transaction-type')).toHaveTextContent(
        TransactionType.CAMBIO_DE_MOEDA,
      )
      expect(screen.getByTestId('transaction-value')).toHaveTextContent(
        '+ R$ 100,00',
      )
      expect(screen.getByTestId('transaction-date')).toHaveTextContent(
        '17/05/2025, 20:59:59',
      )
    })
  })
})
