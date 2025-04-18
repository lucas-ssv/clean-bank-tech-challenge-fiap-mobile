import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react-native'

import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Home } from '@/presentation/screens'

jest.useFakeTimers()
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

class AddAccountMock implements AddAccount {
  async execute(account: AddAccountParams): Promise<void> {}
}

describe('<Home />', () => {
  it('should render correctly on start', async () => {
    const addAccountMock = new AddAccountMock()
    render(
      <GluestackUIProvider>
        <Home addAccount={addAccountMock} />
      </GluestackUIProvider>,
    )

    const openAccountButton = screen.getByTestId('open-account-button')
    await waitFor(() => {
      act(() => fireEvent(openAccountButton, 'press'))
    })
    const checkboxTerms = await screen.findByTestId('checkbox-terms')

    expect(await screen.findByTestId('input-name')).toHaveDisplayValue('')
    expect(await screen.findByTestId('input-email')).toHaveDisplayValue('')
    expect(await screen.findByTestId('input-password')).toHaveDisplayValue('')
    expect(checkboxTerms.props.accessibilityState.checked).toBeUndefined()
    expect(screen.queryByTestId('error-name')).not.toBeOnTheScreen()
    expect(screen.queryByTestId('error-email')).not.toBeOnTheScreen()
    expect(screen.queryByTestId('error-password')).not.toBeOnTheScreen()
    expect(await screen.findByTestId('submit-button')).not.toBeDisabled()
    expect(screen.queryByTestId('submit-button-loading')).not.toBeOnTheScreen()
  })

  it('should show nameError if field name is empty', async () => {
    const addAccountMock = new AddAccountMock()
    render(
      <GluestackUIProvider>
        <Home addAccount={addAccountMock} />
      </GluestackUIProvider>,
    )

    const openAccountButton = screen.getByTestId('open-account-button')
    fireEvent(openAccountButton, 'press')
    const submitButton = await screen.findByTestId('submit-button')
    fireEvent(submitButton, 'press')
    const errorName = await screen.findByTestId('error-name')

    await waitFor(async () => {
      expect(errorName.props.children).toBe('O nome é obrigatório')
    })
  })

  it('should show nameError if field name is less than 2 characters', async () => {
    const addAccountMock = new AddAccountMock()
    render(
      <GluestackUIProvider>
        <Home addAccount={addAccountMock} />
      </GluestackUIProvider>,
    )

    const openAccountButton = screen.getByTestId('open-account-button')
    fireEvent(openAccountButton, 'press')
    const inputName = await screen.findByTestId('input-name')
    fireEvent(inputName, 'changeText', 'x')
    const submitButton = await screen.findByTestId('submit-button')
    fireEvent(submitButton, 'press')
    const errorName = await screen.findByTestId('error-name')

    await waitFor(async () => {
      expect(errorName.props.children).toBe(
        'O nome deve conter pelo menos 2 caracteres',
      )
    })
  })

  it('should show emailError if field email is empty', async () => {
    const addAccountMock = new AddAccountMock()
    render(
      <GluestackUIProvider>
        <Home addAccount={addAccountMock} />
      </GluestackUIProvider>,
    )

    const openAccountButton = screen.getByTestId('open-account-button')
    fireEvent(openAccountButton, 'press')
    const submitButton = await screen.findByTestId('submit-button')
    fireEvent(submitButton, 'press')
    const errorEmail = await screen.findByTestId('error-email')

    await waitFor(async () => {
      expect(errorEmail.props.children).toBe('O e-mail é obrigatório')
    })
  })

  it('should show emailError if field email is not an email', async () => {
    const addAccountMock = new AddAccountMock()
    render(
      <GluestackUIProvider>
        <Home addAccount={addAccountMock} />
      </GluestackUIProvider>,
    )

    const openAccountButton = screen.getByTestId('open-account-button')
    fireEvent(openAccountButton, 'press')
    const inputEmail = await screen.findByTestId('input-email')
    fireEvent(inputEmail, 'changeText', 'any_invalid_email')
    const submitButton = await screen.findByTestId('submit-button')
    fireEvent(submitButton, 'press')
    const errorEmail = await screen.findByTestId('error-email')

    await waitFor(async () => {
      expect(errorEmail.props.children).toBe('Endereço de e-mail inválido')
    })
  })

  it('should show passwordError if field password is empty', async () => {
    const addAccountMock = new AddAccountMock()
    render(
      <GluestackUIProvider>
        <Home addAccount={addAccountMock} />
      </GluestackUIProvider>,
    )

    const openAccountButton = screen.getByTestId('open-account-button')
    fireEvent(openAccountButton, 'press')
    const submitButton = await screen.findByTestId('submit-button')
    fireEvent(submitButton, 'press')
    const errorEmail = await screen.findByTestId('error-password')

    await waitFor(async () => {
      expect(errorEmail.props.children).toBe('A senha é obrigatória')
    })
  })
})
