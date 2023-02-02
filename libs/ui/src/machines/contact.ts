import {
  GetContactByID,
  CreateContactRequest,
} from 'libs/ui/__generated__/contract';
import { useQuery, useMutation } from 'react-query';
import { contactApi, GetContactsList } from '../domains';

export type UseGetContactsQueryParams = {
  initialData?: GetContactsList;
};

export type UseGetContactByIdQuery = {
  initialData?: GetContactByID;
  id: number;
};

export type useUpdateContactMutationParams = {
  payload: CreateContactRequest;
  id: number;
};

export const useGetContactsQuery = ({
  initialData,
}: UseGetContactsQueryParams) =>
  useQuery('contacts', () => contactApi.getContacts(), { initialData });

export const useGetContactByIdQuery = ({
  initialData,
  id,
}: UseGetContactByIdQuery) =>
  useQuery('contact', () => contactApi.getContactByID({ id }), {
    initialData,
  });

export const useUpdateContactMutation = () =>
  useMutation(({ id, payload }: useUpdateContactMutationParams) =>
    contactApi.updateContactByID({ id, updateContactRequest: payload })
  );
