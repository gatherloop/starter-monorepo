import { Skeleton } from '../../../presentations';
import { Button, YStack } from 'tamagui';
import { Contact, GetContactsList } from '../../../domains';
import { AvatarCard, ErrorView } from '../../../presentations';
import { useContactListWidgetMachine } from './ContactListWidget.machine';
import { match } from 'ts-pattern';

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
  const [state, dispatch] = useContactListWidgetMachine(props.initialData);

  const renderView = () => {
    return match(state)
      .with({ type: 'idle' }, { type: 'loading' }, () => (
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
      ))
      .with({ type: 'error' }, () => (
        <ErrorView
          variant={{
            tag: 'fetching-error',
            onRetryButtonPress: () => dispatch({ type: 'FETCH' }),
          }}
        />
      ))
      .with({ type: 'success' }, (state) => {
        return state.data.data.length > 0 ? (
          <ContactListWidgetContent
            contacts={state.data.data}
            onEditButtonPress={props.onEditButtonPress}
          />
        ) : (
          <ErrorView variant={{ tag: 'empty-data' }} />
        );
      })
      .otherwise(() => null);
  };

  return <YStack>{renderView()}</YStack>;
}
