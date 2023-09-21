import {AxiosError} from 'axios';
import {fetchUser, fetchUsers} from './http';
import {useQuery} from 'react-query';
import {UserInfo} from '@mynance/shared-ui/User/types';

export const useUsers = () =>
  useQuery<UserInfo[] | undefined, AxiosError>(
    ['users'],
    async () => await fetchUsers(),
  );

export const useUser = (id: string) =>
  useQuery<UserInfo | undefined, AxiosError>(
    ['user'],
    async () => await fetchUser(id),
  );
