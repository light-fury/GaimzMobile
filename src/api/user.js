import { apiClient } from '../constants/api-client';

export const updateUser = (params) => apiClient.patch('/user', params).then(({ data }) => data);

export const deleteUser = () => apiClient.delete('/user').then(({ data }) => data);
