import {
  GetContactForm,
  getContactFormWidgetInitialData,
} from '../../widgets/contact-form-widget/ContactFormWidget.fetcher';

export async function getContactUpdateScreenProps(
  id: number
): Promise<GetContactForm['initialData']> {
  const contact = await getContactFormWidgetInitialData(id);
  return contact;
}
