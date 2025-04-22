import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react-native'

import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Home } from '@/presentation/screens'
import { useToast } from '@/presentation/components/ui'
import { AddAccountMock } from '@tests/domain/usecases'

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
jest.mock('@/presentation/components/ui/toast', () => ({
  useToast: jest.fn().mockReturnValue({
    show: jest.fn(),
  }),
}))

const makeSignUpSut = async () => {
  const addAccountMock = new AddAccountMock()
  render(
    <GluestackUIProvider>
      <Home addAccount={addAccountMock} />
    </GluestackUIProvider>,
  )

  const openAccountButton = screen.getByTestId('open-account-button')
  await waitFor(() => {
    fireEvent(openAccountButton, 'press')
  })
}

const makeLoginSut = async () => {
  const addAccountMock = new AddAccountMock()
  render(
    <GluestackUIProvider>
      <Home addAccount={addAccountMock} />
    </GluestackUIProvider>,
  )

  const loginButton = screen.getByTestId('login-button')
  await waitFor(() => {
    fireEvent(loginButton, 'press')
  })
}

describe('<Home />', () => {
  it('should render correctly on start', async () => {
    makeSignUpSut()
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

  describe('signUp', () => {
    it('should show nameError if field name is empty', async () => {
      makeSignUpSut()
      const submitButton = await screen.findByTestId('submit-button')
      fireEvent(submitButton, 'press')
      const errorName = await screen.findByTestId('error-name')

      await waitFor(async () => {
        expect(errorName.props.children).toBe('O nome é obrigatório')
      })
    })

    it('should show nameError if field name is less than 2 characters', async () => {
      makeSignUpSut()
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
      makeSignUpSut()
      const submitButton = await screen.findByTestId('submit-button')
      fireEvent(submitButton, 'press')
      const errorEmail = await screen.findByTestId('error-email')

      await waitFor(async () => {
        expect(errorEmail.props.children).toBe('O e-mail é obrigatório')
      })
    })

    it('should show emailError if field email is not an email', async () => {
      makeSignUpSut()
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
      makeSignUpSut()
      const submitButton = await screen.findByTestId('submit-button')
      fireEvent(submitButton, 'press')
      const errorEmail = await screen.findByTestId('error-password')

      await waitFor(async () => {
        expect(errorEmail.props.children).toBe('A senha é obrigatória')
      })
    })

    it('should show passwordError if field password is less than 6', async () => {
      makeSignUpSut()
      const inputPassword = await screen.findByTestId('input-password')
      fireEvent(inputPassword, 'changeText', 'any')
      const submitButton = await screen.findByTestId('submit-button')
      fireEvent(submitButton, 'press')
      const errorEmail = await screen.findByTestId('error-password')

      await waitFor(async () => {
        expect(errorEmail.props.children).toBe(
          'A senha deve conter pelo menos 6 caracteres',
        )
      })
    })

    it('should show border error if checkbox terms is false', async () => {
      makeSignUpSut()
      const checkboxTerms = await screen.findByTestId('checkbox-terms')
      const submitButton = await screen.findByTestId('submit-button')
      act(() => {
        fireEvent(submitButton, 'press')
      })

      await waitFor(async () => {
        expect(checkboxTerms.props.className).toBe(
          '!border-custom-my-dark-red !rounded-[5px]',
        )
      })
    })

    it('should show toast error if AddAccount throws', async () => {
      const addAccountMock = new AddAccountMock()
      jest.spyOn(addAccountMock, 'execute').mockImplementationOnce(() => {
        throw new Error()
      })
      render(
        <GluestackUIProvider>
          <Home addAccount={addAccountMock} />
        </GluestackUIProvider>,
      )

      const openAccountButton = screen.getByTestId('open-account-button')
      fireEvent(openAccountButton, 'press')
      const inputName = await screen.findByTestId('input-name')
      fireEvent(inputName, 'changeText', 'any_name')
      const inputEmail = await screen.findByTestId('input-email')
      fireEvent(inputEmail, 'changeText', 'any_email@mail.com')
      const inputPassword = await screen.findByTestId('input-password')
      fireEvent(inputPassword, 'changeText', 'any_password')
      const checkboxTerms = await screen.findByTestId('checkbox-terms')
      fireEvent(checkboxTerms, 'press')
      const submitButton = await screen.findByTestId('submit-button')
      act(() => {
        fireEvent(submitButton, 'press')
      })

      await waitFor(async () => {
        expect(useToast().show).toHaveBeenCalled()
      })
    })

    it('should show loading on submit', async () => {
      makeSignUpSut()
      const inputName = await screen.findByTestId('input-name')
      fireEvent(inputName, 'changeText', 'any_name')
      const inputEmail = await screen.findByTestId('input-email')
      fireEvent(inputEmail, 'changeText', 'any_email@mail.com')
      const inputPassword = await screen.findByTestId('input-password')
      fireEvent(inputPassword, 'changeText', 'any_password')
      const checkboxTerms = await screen.findByTestId('checkbox-terms')
      fireEvent(checkboxTerms, 'press')
      const submitButton = await screen.findByTestId('submit-button')
      await waitFor(() => {
        fireEvent.press(submitButton)
      })

      await waitFor(() => {
        expect(screen.getByTestId('submit-button-loading')).toBeOnTheScreen()
        expect(submitButton).toBeDisabled()
      })
    })
  })

  describe('login', () => {
    it('should show emailError if field email is empty', async () => {
      makeLoginSut()
      const submitButton = await screen.findByTestId('submit-button')
      fireEvent(submitButton, 'press')
      const errorEmail = await screen.findByTestId('error-email')

      await waitFor(async () => {
        expect(errorEmail.props.children).toBe('O e-mail é obrigatório')
      })
    })
  })
})
