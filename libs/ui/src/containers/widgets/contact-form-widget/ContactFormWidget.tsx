import {
  useCreateContactMutation,
  useGetContactByIdQuery,
  useUpdateContactMutation,
} from 'libs/ui/src/machines';
import { ErrorView, Form, FormPops, Skeleton } from 'libs/ui/src/presentations';
import React from 'react';
import { YStack } from 'tamagui';
import { GetContactByID } from '../../../domains/';

type ContactFormWidgetVariant =
  | { type: 'create' }
  | {
      type: 'update';
      initialData?: GetContactByID;
      id: number;
    };

export interface ContactFormWidgetProps {
  variant: ContactFormWidgetVariant;
}

export const ContactFormWidget = (props: ContactFormWidgetProps) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [profilePictureURL, setProfilePictureUrl] = React.useState('');

  const { status, data, refetch } = useGetContactByIdQuery({
    initialData:
      props.variant.type === 'update' ? props.variant.initialData : undefined,
    id: props.variant.type === 'update' ? props.variant.id : 0,
    enabled: props.variant.type === 'update',
  });

  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
    useUpdateContactMutation();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } =
    useCreateContactMutation();

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
    props.variant.type === 'create'
      ? mutateCreate({
          payload: {
            name,
            phone,
            profilePictureURL,
          },
        })
      : mutateUpdate({
          id: props.variant.id,
          payload: {
            name,
            phone,
            profilePictureURL,
          },
        });
  };

  const renderView = () => {
    switch (props.variant.type) {
      case 'create':
        return (
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            isSubmitting={isLoadingCreate}
          />
        );
      case 'update':
        switch (status) {
          case 'idle':
          case 'loading': {
            return (
              <Skeleton isLoading>
                <Form
                  fields={fields}
                  onSubmit={handleSubmit}
                  isSubmitting={isLoadingUpdate}
                />
              </Skeleton>
            );
          }
          case 'error': {
            return (
              <ErrorView
                variant={{
                  tag: 'fetching-error',
                  onRetryButtonPress: refetch,
                }}
              />
            );
          }
          case 'success': {
            return (
              <Form
                fields={fields}
                onSubmit={handleSubmit}
                isSubmitting={isLoadingUpdate}
              />
            );
          }
          default:
            break;
        }
    }
  };

  return (
    <YStack alignItems="center" justifyContent="center">
      {renderView()}
    </YStack>
  );
};

export default ContactFormWidget;
