import { contactApi } from 'libs/ui/src/domains';
import { ContactUpdateScreenProps } from '../../screens';
import { ContactFormWidgetProps } from './ContactFormWidget';

export async function getContactFormWidgetInitialData(
  id: number
): Promise<ContactUpdateScreenProps['initialData']> {
  const initialData = await contactApi.getContactByID({ id });
  return initialData;
}
