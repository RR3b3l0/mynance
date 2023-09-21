import {rest} from 'msw';

import {server} from '../mocks/server';

export const usersHandler = [
  rest.get('http://localhost:8000/users', (req, res, ctx) => {
    return res(ctx.json([{id: 1, name: 'test', balance: 200}]));
  }),
];

export const usersEmptyHandler = [
  rest.get('http://localhost:8000/users', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];

export const setupUsersServer = () => {
  server.use(...usersHandler);
};

export const setupEmptyUsersServer = () => {
  server.use(...usersEmptyHandler);
};
