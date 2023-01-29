import { Paragraph, YStack } from 'tamagui';
import { GetContactsList } from '../../../domains';
import { useGetContactsQuery } from '../../../machines';
import { Card } from '../../../presentations';

export interface ContactListWidgetProps {
  initialData?: GetContactsList;
}

export function ContactListWidget(props: ContactListWidgetProps) {
  const { status, data } = useGetContactsQuery({
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
        return <Paragraph>Error...</Paragraph>;
      }
      case 'success': {
        if (data.data.length > 0) {
          <YStack>
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
          </YStack>;
        } else {
          return <Paragraph>Data Empty</Paragraph>;
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
