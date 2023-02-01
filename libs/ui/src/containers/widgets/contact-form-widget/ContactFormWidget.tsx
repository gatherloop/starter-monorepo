import { ErrorView, Form, FormPops, Skeleton } from 'libs/ui/src/presentations';
import React from 'react';
import { YStack } from 'tamagui';
import {
  useGetContactByIdQuery,
  useUpdateContactMutation,
} from '../../../machines';
import { GetContactByID } from '../../../domains/';

interface ContactFormWidgetProps {
  initialData?: GetContactByID;
  id: number;
}

export const ContactFormWidget = (props: ContactFormWidgetProps) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [profilePictureURL, setProfilePictureUrl] = React.useState('');

  const { status, data, refetch } = useGetContactByIdQuery({
    initialData: props.initialData,
    id: props.id,
  });

  const { mutate, isLoading } = useUpdateContactMutation();

  React.useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setPhone(data.data.phone);
      setProfilePictureUrl(data.data.profilePictureURL);
    }
  }, [data?.data]);

  const fields: FormPops['fields'] = [
    {
      label: 'Name',
      id: 'name',
      placeholder: 'Input your name',
      value: name,
      onChange: setName,
    },
    {
      label: 'Phone',
      id: 'phone',
      placeholder: '082xxxxxxx',
      value: phone,
      onChange: setPhone,
    },
    {
      label: 'Profile Picture URL',
      id: 'profilePicture',
      placeholder: 'https://example.com/photo.jpg',
      value: profilePictureURL,
      onChange: setProfilePictureUrl,
    },
  ];

  const handleSubmit = () => {
    mutate({
      id: props.id,
      payload: {
        name,
        phone,
        profilePictureURL,
      },
    });
  };

  const renderView = () => {
    switch (status) {
      case 'idle': {
      }
      case 'loading': {
        return (
          <Skeleton isLoading>
            <Form
              fields={[
                {
                  id: 'lorem',
                  label: 'lorem',
                  value: 'lorem',
                  placeholder: 'lorem',
                  errorMessage: 'lorem',
                  helpTextMessage: 'lorem',
                  onChange: () => null,
                },
              ]}
              onSubmit={() => null}
              isSubmitting={false}
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
        return (
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
          />
        );
      }
      default:
        break;
    }
  };

  return (
    <YStack alignItems="center" justifyContent="center">
      {renderView()}
    </YStack>
  );
};

export default ContactFormWidget;
