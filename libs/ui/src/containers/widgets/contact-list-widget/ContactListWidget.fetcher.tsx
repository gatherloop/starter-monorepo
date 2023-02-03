import { contactApi } from '../../../domains';
import { ContactListWidgetProps } from './ContactListWidget';

export async function getContactListWidgetInitialData(): Promise<
  ContactListWidgetProps['initialData']
> {
  const initialData = await contactApi.getContacts();
  return initialData;
}
