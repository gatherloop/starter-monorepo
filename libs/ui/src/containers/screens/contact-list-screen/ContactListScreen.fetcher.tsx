import { getContactListWidgetInitialData } from '../../widgets';
import { ContactListScreenProps } from './ContactListScreen';

export async function getContactListScreenProps(): Promise<ContactListScreenProps> {
  const contactList = await getContactListWidgetInitialData();
  return { contactList };
}
