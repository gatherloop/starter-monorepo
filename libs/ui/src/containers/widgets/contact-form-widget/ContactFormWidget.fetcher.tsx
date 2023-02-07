import { contactApi, CreateContactRequest } from 'libs/ui/src/domains';
import { ContactFormWidgetProps } from './ContactFormWidget';

export type GetContactForm = Extract<
  ContactFormWidgetProps['variant'],
  { type: 'update' }
>;

export async function getContactFormWidgetInitialData(
  id: number
): Promise<GetContactForm['initialData']> {
  const initialData = await contactApi.getContactByID({ id });
  return initialData;
}

type mutateUpdateContactParams = {
  id: number;
  payload: CreateContactRequest;
};

export async function mutateUpdateContact({
  id,
  payload,
}: mutateUpdateContactParams) {
  return contactApi.updateContactByID({ id, updateContactRequest: payload });
}

type mutateCreateContactParams = {
  payload: CreateContactRequest;
};

export async function mutateCreateContact({
  payload,
}: mutateCreateContactParams) {
  return contactApi.createContact({ createContactRequest: payload });
}
