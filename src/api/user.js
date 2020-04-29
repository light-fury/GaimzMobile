import { apiClient } from '../constants/api-client';

export const updateUser = (params) => apiClient.put('/user', params).then(({ data }) => data);

export default {
  updateUser,
};
