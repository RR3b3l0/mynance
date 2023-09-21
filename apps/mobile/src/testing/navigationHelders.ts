export function prepareStackScreenProps(routeParams: Object = {}) {
  const route: any = {params: routeParams};
  const navigation: any = {
    goBack: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
    addListener: jest.fn(),
    setOptions: jest.fn(),
    popToTop: jest.fn(),
    setParams: jest.fn(),
    getState: jest.fn(),
    dispatch: jest.fn(),
  };

  return {
    route,
    navigation,
  };
}
