import { Container, PageHeading } from 'libs/ui/src/presentations';
import { useRouter } from 'next/router';
import { YStack } from 'tamagui';
import { ContactFormWidget } from '../../widgets';
import { GetContactForm } from '../../widgets/contact-form-widget/ContactFormWidget.fetcher';

export const ContactUpdateScreen = (props: GetContactForm) => {
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
            type: props.type,
            id: props.id,
            initialData: props.initialData,
          }}
        />
      </Container>
    </YStack>
  );
};

export default ContactUpdateScreen;
