import { getContactFormWidgetInitialData } from '../../widgets/contact-form-widget/ContactFormWidget.fetcher';
import { ContactUpdateScreenProps } from './ContactUpdateScreen';

export async function getContactUpdateScreenProps(
  id: number
): Promise<ContactUpdateScreenProps> {
  const contact = await getContactFormWidgetInitialData(id);
  return { initialData: contact, id };
}
