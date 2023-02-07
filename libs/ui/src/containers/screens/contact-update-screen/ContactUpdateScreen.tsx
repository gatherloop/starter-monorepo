import { Container, PageHeading } from 'libs/ui/src/presentations';
import { useRouter } from 'next/router';
import { YStack } from 'tamagui';
import { ContactFormWidget } from '../../widgets';
import { GetContactByID } from '../../../domains/';

export interface ContactUpdateScreenProps {
  id: number;
  initialData: GetContactByID;
}

export const ContactUpdateScreen = (props: ContactUpdateScreenProps) => {
  const router = useRouter();

  return (
    <YStack space="$5" paddingBottom="$5">
      <PageHeading
        title="Edit Contact"
        hasBackIcon
        onBackIconPress={() => router.back()}
      />
      <Container>
        <ContactFormWidget
          variant={{
            type: 'update',
            id: props.id,
            initialData: props.initialData,
          }}
        />
      </Container>
    </YStack>
  );
};

export default ContactUpdateScreen;
