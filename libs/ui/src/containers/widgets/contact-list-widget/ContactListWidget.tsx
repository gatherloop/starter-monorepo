import { Paragraph, YStack } from 'tamagui';
import { GetContactsList } from '../../../domains';
import { useGetContactsQuery } from '../../../machines';
import { Card, ErrorView } from '../../../presentations';

export interface ContactListWidgetProps {
  initialData?: GetContactsList;
}

export function ContactListWidget(props: ContactListWidgetProps) {
  const { status, data, refetch } = useGetContactsQuery({
    initialData: props.initialData,
  });

  const renderView = () => {
    switch (status) {
      case 'idle': {
        return <Paragraph>Loading...</Paragraph>;
      }
      case 'loading': {
        return <Paragraph>Loading...</Paragraph>;
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
            <YStack space="$5">
              {data.data.map(({ id, profilePictureURL, name, phone }) => (
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
