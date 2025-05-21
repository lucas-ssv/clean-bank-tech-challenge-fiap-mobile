import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'
import { Timestamp } from 'firebase/firestore'
import { Alert } from 'react-native'
import { Provider } from 'react-redux'

import {
  LoadTransactionsMock,
  RemoveTransactionMock,
  UpdateTransactionMock,
} from '@tests/domain/usecases/transaction'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Transacoes } from '@/presentation/screens'
import { TransactionType } from '@/domain/models/transaction'
import { store } from '@/presentation/app'

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
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
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
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
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

  it('should show modal filters when clicking on the filter button', async () => {
    const loadTransactionsMock = new LoadTransactionsMock()
    jest.spyOn(loadTransactionsMock, 'execute').mockResolvedValue([])
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
      </GluestackUIProvider>,
    )

    const filterButton = screen.getByTestId('filter-button')
    fireEvent(filterButton, 'press')

    await waitFor(() => {
      expect(screen.getByTestId('modal-filters')).toBeTruthy()
    })
  })

  it('should show loading when fetching transactions', async () => {
    const loadTransactionsMock = new LoadTransactionsMock()
    jest.spyOn(loadTransactionsMock, 'execute').mockResolvedValue([])
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
      </GluestackUIProvider>,
    )

    const filterButton = screen.getByTestId('filter-button')
    fireEvent(filterButton, 'press')

    const submitButton = screen.getByTestId('submit-button')
    fireEvent(submitButton, 'press')

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeTruthy()
    })
  })

  it('should show ModalUpdateTransaction when clicking on the edit button', async () => {
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
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
      </GluestackUIProvider>,
    )

    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button')
      fireEvent(editButton, 'press')
    })

    await waitFor(() => {
      expect(screen.getByTestId('modal-update-transaction')).toBeTruthy()
    })
  })

  it('should show a valueError if the value is less than 1', async () => {
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
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
      </GluestackUIProvider>,
    )

    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button')
      fireEvent(editButton, 'press')
    })
    fireEvent(
      screen.getByTestId('edit-transaction-value'),
      'changeText',
      '0,50',
    )
    fireEvent(screen.getByTestId('submit-button'), 'press')

    await waitFor(() => {
      expect(screen.getByText('O valor mínimo é R$1,00')).toBeTruthy()
    })
  })

  it('should show loading when updating transaction', async () => {
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
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
      </GluestackUIProvider>,
    )

    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button')
      fireEvent(editButton, 'press')
    })
    fireEvent(
      screen.getByTestId('edit-transaction-value'),
      'changeText',
      '100,00',
    )
    fireEvent(screen.getByTestId('submit-button'), 'press')

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeTruthy()
    })
  })

  it('should show alert confirmation when clicking on the delete button', async () => {
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
    const alertSpy = jest.spyOn(Alert, 'alert')
    const updateTransactionMock = new UpdateTransactionMock()
    const removeTransactionMock = new RemoveTransactionMock()
    render(
      <GluestackUIProvider>
        <Provider store={store}>
          <Transacoes
            loadTransactions={loadTransactionsMock}
            updateTransaction={updateTransactionMock}
            removeTransaction={removeTransactionMock}
          />
        </Provider>
      </GluestackUIProvider>,
    )

    await waitFor(() => {
      const deleteButton = screen.getByTestId('delete-button')
      fireEvent(deleteButton, 'press')
    })

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Remover transação',
        'Deseja realmente remover esta transação?',
        [
          {
            style: 'cancel',
            text: 'Cancelar',
          },
          {
            style: 'destructive',
            text: 'Remover',
            onPress: expect.any(Function),
          },
        ],
      )
    })
  })
})
