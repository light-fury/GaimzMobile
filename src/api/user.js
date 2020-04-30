import { apiClient } from '../constants/api-client';

export const updateUser = (params) => apiClient.patch('/user', params).then(({ data }) => data).catch((err) => console.warn(err.response.data));

export const deleteUser = () => apiClient.delete('/user');
