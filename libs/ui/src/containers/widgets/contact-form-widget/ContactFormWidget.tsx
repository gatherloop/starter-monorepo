import { ErrorView, Form, FormPops, Skeleton } from 'libs/ui/src/presentations';
import React from 'react';
import { YStack } from 'tamagui';
import { GetContactByID } from '../../../domains/';
import {
  mutateCreateContact,
  mutateUpdateContact,
} from './ContactFormWidget.fetcher';

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
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('loading');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (props.variant.type === 'update' && props.variant.initialData) {
      setName(props.variant.initialData.data.name);
      setPhone(props.variant.initialData.data.phone);
      setProfilePictureUrl(props.variant.initialData.data.profilePictureURL);
      setStatus('success');
    }
  }, []);

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

  const handleSubmit = async () => {
    props.variant.type === 'create'
      ? await mutateCreateContact({
          payload: {
            name,
            phone,
            profilePictureURL,
          },
        }).then(() => setIsSubmitting(true))
      : mutateUpdateContact({
          id: props.variant.id,
          payload: {
            name,
            phone,
            profilePictureURL,
          },
        }).then(() => setIsSubmitting(true));
    setIsSubmitting(false);
  };

  const renderView = () => {
    switch (props.variant.type) {
      case 'create':
        return (
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
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
                  isSubmitting={isSubmitting}
                />
              </Skeleton>
            );
          }
          case 'error': {
            return (
              <ErrorView
                variant={{
                  tag: 'fetching-error',
                  onRetryButtonPress: () => null,
                }}
              />
            );
          }
          case 'success': {
            return (
              <Form
                fields={fields}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
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
