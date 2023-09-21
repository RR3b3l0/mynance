import * as React from 'react';
import * as r23y from '@testing-library/react-native';

import {QueryProvider} from './QueryProvider';

const createTestRenderer = () => {
  const wrapper = ({children}: {children: JSX.Element}): JSX.Element => (
    <QueryProvider>{children}</QueryProvider>
  );

  const render = (Component: JSX.Element): r23y.RenderAPI =>
    r23y.render(Component, {wrapper});

  return {render};
};

export {createTestRenderer};
