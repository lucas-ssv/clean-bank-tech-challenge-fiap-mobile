export type StackParamList = {
  Home: undefined
  Investimentos: undefined
  MeusCartoes: undefined
  Servicos: undefined
  Profile: undefined
  Transacoes: undefined
}

export type DrawerParamList = {
  StackRoutes: {
    screen: keyof StackParamList
  }
}

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends DrawerParamList {}
  }
}
