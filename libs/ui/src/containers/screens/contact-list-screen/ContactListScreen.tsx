import { Container, PageHeading } from '../../../presentations';
import { ContactListWidget } from '../../widgets';
import { GetContactsList } from '../../../domains';
import { Button, YStack } from 'tamagui';

export interface ContactListScreenProps {
  contactList?: GetContactsList;
}

export function ContactListScreen(props: ContactListScreenProps) {
  return (
    <YStack space="$5" paddingBottom="$5">
      <PageHeading
        title="Contact List"
        rightItem={<Button theme="blue">Create</Button>}
      />
      <Container>
        <ContactListWidget initialData={props.contactList} />
      </Container>
    </YStack>
  );
}
