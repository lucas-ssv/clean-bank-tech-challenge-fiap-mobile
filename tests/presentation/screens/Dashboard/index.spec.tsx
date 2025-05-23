import { Provider } from 'react-redux'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

import {
  AddTransactionMock,
  LoadTransactionsByDateStub,
  LoadTransactionsMock,
} from '@tests/domain/usecases/transaction'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Dashboard } from '@/presentation/screens'
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

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}))

jest.mock('firebase/firestore', () => ({
  Timestamp: jest.fn(),
}))

jest.mock('@expo/vector-icons/Feather')
jest.mock('@expo/vector-icons/MaterialIcons')

const makeSut = () => {
  const addTransactionMock = new AddTransactionMock()
  const loadTransactionsByDateStub = new LoadTransactionsByDateStub()
  const loadTransactionsMock = new LoadTransactionsMock()
  render(
    <GluestackUIProvider>
      <Provider store={store}>
        <Dashboard
          addTransaction={addTransactionMock}
          loadTransactionsByDate={loadTransactionsByDateStub}
          loadTransactions={loadTransactionsMock}
        />
      </Provider>
    </GluestackUIProvider>,
  )
}

describe('<Dashboard />', () => {
  it('should render correctly on start', async () => {
    makeSut()
    await waitFor(() => {
      expect(screen.getByTestId('transaction-type')).toBeTruthy()
      expect(screen.getByTestId('input-value').props.placeholder).toBe(
        'R$ 0,00',
      )
      expect(screen.queryByTestId('card-document')).not.toBeOnTheScreen()
      expect(
        screen.queryByTestId('loading-finish-transation'),
      ).not.toBeOnTheScreen()
      expect(
        screen.queryByTestId('transaction-type-error'),
      ).not.toBeOnTheScreen()
      expect(screen.queryByTestId('input-value-error')).not.toBeOnTheScreen()
    })
  })

  it('should show transactionTypeError if field transactionType is empty', async () => {
    makeSut()
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => {})
    fireEvent(submitButton, 'press')
    await waitFor(() => {
      expect(screen.getByTestId('transaction-type-error').props.children).toBe(
        'O tipo da transação é obrigatório',
      )
    })
  })

  it('should show valueError if field value is empty', async () => {
    makeSut()
    const inputValue = screen.getByTestId('input-value')
    fireEvent(inputValue, 'changeText', '')
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => {})
    fireEvent(submitButton, 'press')
    await waitFor(() => {
      expect(screen.getByTestId('input-value-error').props.children).toBe(
        'O valor é obrigatório',
      )
    })
  })

  it('should show valueError if field value is less than 1', async () => {
    makeSut()
    const inputValue = screen.getByTestId('input-value')
    fireEvent(inputValue, 'changeText', '00.01')
    const submitButton = screen.getByTestId('submit-button')
    await waitFor(() => {})
    fireEvent(submitButton, 'press')
    await waitFor(() => {
      expect(screen.getByTestId('input-value-error').props.children).toBe(
        'O valor mínimo é R$1,00',
      )
    })
  })
})
