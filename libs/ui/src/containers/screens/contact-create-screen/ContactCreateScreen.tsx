import { Container, PageHeading } from 'libs/ui/src/presentations';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';
import { ContactFormWidget } from '../../widgets';

export const ContactCreateScreen = () => {
  const router = useRouter();

  return (
    <YStack space="$5" paddingBottom="$5">
      <PageHeading
        title="Create Contact"
        hasBackIcon
        onBackIconPress={() => router.back()}
      />
      <Container>
        <ContactFormWidget
          variant={{
            type: 'create',
          }}
          onSubmitSuccess={() => router.push('/')}
        />
      </Container>
    </YStack>
  );
};

export default ContactCreateScreen;
