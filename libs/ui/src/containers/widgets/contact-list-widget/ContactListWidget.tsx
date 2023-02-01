import { Skeleton } from '../../../presentations';
import { YStack } from 'tamagui';
import { GetContactsList } from '../../../domains';
import { useGetContactsQuery } from '../../../machines';
import { Card, ErrorView } from '../../../presentations';

type ContactListWidgetContentProps = {
  contacts: GetContactsList['data'];
};

function ContactListWidgetContent({ contacts }: ContactListWidgetContentProps) {
  return (
    <YStack space="$5">
      {contacts.map(({ id, profilePictureURL, name, phone }) => (
        <Card
          key={id}
          avatarImageSrc={profilePictureURL}
          items={[
            { label: 'Name', value: name },
            { label: 'Phone', value: phone },
          ]}
        />
      ))}
    </YStack>
  );
}

export interface ContactListWidgetProps {
  initialData?: GetContactsList;
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
          return <ContactListWidgetContent contacts={data.data} />;
        } else {
          return <ErrorView variant={{ tag: 'empty-data' }} />;
        }
      }
    }
  };

  return (
    <YStack alignItems="center" justifyContent="center">
      {renderView()}
    </YStack>
  );
}
