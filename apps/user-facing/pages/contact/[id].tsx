import {
  ContactUpdateScreen,
  getContactUpdateScreenProps,
} from '@course-explorer-monorepo/ui';
import { GetContactForm } from 'libs/ui/src/containers/widgets/contact-form-widget/ContactFormWidget.fetcher';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<GetContactForm> = async (
  context
) => {
  const contact = await getContactUpdateScreenProps(Number(context.params?.id));
  return {
    props: {
      type: 'update',
      initialData: contact,
      id: Number(context.params?.id),
    },
  };
};

export default ContactUpdateScreen;
