import { Container, PageHeading } from '../../../presentations';
import { ContactListWidget } from '../../widgets';
import { GetContactsList } from '../../../domains';
import { Button, YStack } from 'tamagui';
import { useRouter } from 'solito/router';

export interface ContactListScreenProps {
  contactList?: GetContactsList;
}

export function ContactListScreen(props: ContactListScreenProps) {
  const router = useRouter();
  return (
    <YStack space="$5" paddingBottom="$5">
      <PageHeading
        title="Contact List"
        rightItem={
          <Button theme="blue" onPress={() => router.push('/contact')}>
            Create
          </Button>
        }
      />
      <Container>
        <ContactListWidget
          initialData={props.contactList}
          onEditButtonPress={(contact) => router.push(`/contact/${contact.id}`)}
        />
      </Container>
    </YStack>
  );
}
