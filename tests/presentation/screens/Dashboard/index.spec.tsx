import { render, screen } from '@testing-library/react-native'

import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { Dashboard } from '@/presentation/screens'

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

jest.mock('@expo/vector-icons/Feather')
jest.mock('@expo/vector-icons/MaterialIcons')

describe('<Dashboard />', () => {
  it('should render correctly on start', () => {
    render(
      <GluestackUIProvider>
        <Dashboard />
      </GluestackUIProvider>,
    )

    expect(screen.getByTestId('select-transaction')).toBeTruthy()
    expect(screen.getByTestId('input-value')).toHaveDisplayValue('R$ 0,00')
    expect(screen.queryByTestId('card-document')).not.toBeOnTheScreen()
    expect(
      screen.queryByTestId('loading-finish-transation'),
    ).not.toBeOnTheScreen()
    expect(
      screen.queryByTestId('select-transaction-error'),
    ).not.toBeOnTheScreen()
    expect(screen.queryByTestId('input-value-error')).not.toBeOnTheScreen()
  })
})
