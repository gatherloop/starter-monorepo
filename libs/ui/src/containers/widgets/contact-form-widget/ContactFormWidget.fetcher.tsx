import { contactApi } from 'libs/ui/src/domains';
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
