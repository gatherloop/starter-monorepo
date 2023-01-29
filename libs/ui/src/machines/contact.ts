import { useQuery } from 'react-query';
import { contactApi, GetContactsList } from '../domains';

export type UseGetContactsQueryParams = {
  initialData?: GetContactsList;
};

export const useGetContactsQuery = ({
  initialData,
}: UseGetContactsQueryParams) =>
  useQuery('contacts', () => contactApi.getContacts(), { initialData });
