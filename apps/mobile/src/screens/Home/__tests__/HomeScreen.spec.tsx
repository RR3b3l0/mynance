import React from 'react';
import {fireEvent, screen, waitFor} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import {createTestRenderer} from '../../../testing/testRenderer';
import {setupEmptyUsersServer, setupUsersServer} from '../../../mocks/handlers';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...Object.assign({}, jest.requireActual('@react-navigation/native')),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('HomeScreen', () => {
  test('it should render register information', async () => {
    setupEmptyUsersServer();
    const {render} = createTestRenderer();
    render(<HomeScreen />);
    await waitFor(() => {
      screen.getAllByTestId('loading');
    });
    await waitFor(() => {
      screen.getAllByText('Register information');
    });
  });

  test('it should render user list', async () => {
    setupUsersServer();
    const {render} = createTestRenderer();
    render(<HomeScreen />);
    await waitFor(() => {
      screen.getAllByTestId('loading');
    });
    await waitFor(() => {
      screen.getAllByText('NAME: test');
      screen.getAllByText('BALANCE: 200€');
      screen.getAllByText('Delete user');
      const checkUserButton = screen.getByText('Check user');
      fireEvent.press(checkUserButton);
      expect(mockNavigate).toHaveBeenCalledWith('Details', {id: 1});
    });
  });
});
