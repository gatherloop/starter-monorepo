import { Skeleton } from '../../../presentations';
import { Button, YStack } from 'tamagui';
import { Contact, GetContactsList } from '../../../domains';
import { useGetContactsQuery } from '../../../machines';
import { AvatarCard, ErrorView } from '../../../presentations';

type ContactListWidgetContentProps = {
  contacts: GetContactsList['data'];
  onEditButtonPress?: (contact: Contact) => void;
};

function ContactListWidgetContent({
  contacts,
  onEditButtonPress,
}: ContactListWidgetContentProps) {
  return (
    <YStack space="$5">
      {contacts.map((contact) => (
        <AvatarCard
          key={contact.id}
          avatarImageSrc={contact.profilePictureURL}
          items={[
            { label: 'Name', value: contact.name },
            { label: 'Phone', value: contact.phone },
          ]}
          rightItem={
            <Button
              theme="blue"
              onPress={onEditButtonPress && (() => onEditButtonPress(contact))}
            >
              Edit
            </Button>
          }
        />
      ))}
    </YStack>
  );
}

export interface ContactListWidgetProps {
  initialData?: GetContactsList;
  onEditButtonPress?: (contact: Contact) => void;
}

export function ContactListWidget(props: ContactListWidgetProps) {
  const { status, data, refetch } = useGetContactsQuery({
    initialData: props.initialData,
  });

  const renderView = () => {
    switch (status) {
      case 'idle':
      case 'loading': {
        return (
          <Skeleton isLoading>
            <ContactListWidgetContent
              contacts={Array.from(Array(3)).map((_, index) => ({
                id: index,
                name: 'Lorem ipsum dolor',
                phone: 'Lorem ipsum dolor',
                profilePictureURL: 'Lorem ipsum dolor',
              }))}
            />
          </Skeleton>
        );
      }
      case 'error': {
        return (
          <ErrorView
            variant={{ tag: 'fetching-error', onRetryButtonPress: refetch }}
          />
        );
      }
      case 'success': {
        if (data.data.length > 0) {
          return (
            <ContactListWidgetContent
              contacts={data.data}
              onEditButtonPress={props.onEditButtonPress}
            />
          );
        } else {
          return <ErrorView variant={{ tag: 'empty-data' }} />;
        }
      }
    }
  };

  return <YStack>{renderView()}</YStack>;
}
