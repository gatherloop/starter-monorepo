import {
  GetContactByID,
  CreateContactRequest,
  UpdateContactRequest,
} from 'libs/ui/__generated__/contract';
import { useQuery, useMutation } from 'react-query';
import { contactApi, GetContactsList } from '../domains';

export type UseGetContactsQueryParams = {
  initialData?: GetContactsList;
};

export type UseGetContactByIdQuery = {
  initialData?: GetContactByID;
  id: number;
  enabled?: boolean;
};

export type useUpdateContactMutationParams = {
  payload: UpdateContactRequest;
  id: number;
};

export type useCreateContactMutationParams = {
  payload: CreateContactRequest;
};

export const useGetContactsQuery = ({
  initialData,
}: UseGetContactsQueryParams) =>
  useQuery('contacts', () => contactApi.getContacts(), { initialData });

export const useGetContactByIdQuery = ({
  initialData,
  id,
  enabled,
}: UseGetContactByIdQuery) =>
  useQuery('contact', () => contactApi.getContactByID({ id }), {
    initialData,
    enabled,
  });

export const useUpdateContactMutation = () =>
  useMutation(({ id, payload }: useUpdateContactMutationParams) =>
    contactApi.updateContactByID({ id, updateContactRequest: payload })
  );

export const useCreateContactMutation = () =>
  useMutation(({ payload }: useCreateContactMutationParams) =>
    contactApi.createContact({
      createContactRequest: payload,
    })
  );
