import {
  ContactFormScreen,
  getContactFormScreenProps,
} from '@course-explorer-monorepo/ui';
import { GetContactForm } from 'libs/ui/src/containers/widgets/contact-form-widget/ContactFormWidget.fetcher';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{
  variant: GetContactForm;
}> = async (context) => {
  const contact = await getContactFormScreenProps(Number(context.params?.id));
  return {
    props: {
      variant: {
        type: 'update',
        initialData: contact,
        id: Number(context.params?.id),
      },
    },
  };
};

export default ContactFormScreen;
