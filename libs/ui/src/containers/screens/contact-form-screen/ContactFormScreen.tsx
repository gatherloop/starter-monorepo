import { Container, PageHeading } from 'libs/ui/src/presentations';
import { useRouter } from 'next/router';
import { YStack } from 'tamagui';
import { ContactFormWidget, ContactFormWidgetProps } from '../../widgets';

export const ContactFormScreen = (props: ContactFormWidgetProps) => {
  const router = useRouter();

  return (
    <YStack space="$5" paddingBottom="$5">
      <PageHeading
        title={
          props.variant.type === 'create' ? 'Create Contact' : 'Edit Contact'
        }
        hasBackIcon
        onBackIconPress={() => router.push('/')}
      />
      <Container>
        {props.variant.type === 'create' ? (
          <ContactFormWidget variant={{ type: props.variant.type }} />
        ) : (
          <ContactFormWidget
            variant={{
              type: props.variant.type,
              id: props.variant.id,
              initialData: props.variant.initialData,
            }}
          />
        )}
      </Container>
    </YStack>
  );
};

export default ContactFormScreen;
