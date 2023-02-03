import {
  ContactListScreen,
  ContactListScreenProps,
  getContactListScreenProps,
} from '@course-explorer-monorepo/ui';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<
  ContactListScreenProps
> = async () => {
  const props = await getContactListScreenProps();
  return { props };
};

export default ContactListScreen;
