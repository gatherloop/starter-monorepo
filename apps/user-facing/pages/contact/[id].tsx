import {
  ContactUpdateScreen,
  ContactUpdateScreenProps,
  getContactUpdateScreenProps,
} from '@course-explorer-monorepo/ui';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<
  ContactUpdateScreenProps
> = async (context) => {
  const props = await getContactUpdateScreenProps(Number(context.params?.id));
  return {
    props,
  };
};

export default ContactUpdateScreen;
