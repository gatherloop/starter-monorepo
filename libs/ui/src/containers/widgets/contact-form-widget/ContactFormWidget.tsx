import { contactApi } from 'libs/ui/src/domains';
import { Form } from 'libs/ui/src/presentations/organisms/form';
import { GetContactByID } from 'libs/ui/__generated__/contract';
import React from 'react';
import { useMutation } from 'react-query';
import { Paragraph, YStack } from 'tamagui';
import {
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useUpdateContactMutationParams,
} from '../../../machines';

interface ContactFormWidgetProps {
  initialData?: GetContactByID;
  id: number;
}

export const ContactFormWidget = (props: ContactFormWidgetProps) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [profilePictureURL, setProfilePictureUrl] = React.useState('');

  const { status, data } = useGetContactByIdQuery({
    initialData: props.initialData,
    id: props.id,
  });

  React.useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setPhone(data.data.phone);
      setProfilePictureUrl(data.data.profilePictureURL);
    }
  }, [data?.data]);

  const fields = [
    {
      label: 'Name',
      id: 'name',
      placeholder: 'Input your name',
      value: name,
      onChange: (name: string) => setName(name),
    },
    {
      label: 'Phone',
      id: 'phone',
      placeholder: '082xxxxxxx',
      value: phone,
      onChange: (phone: string) => setPhone(phone),
    },
    {
      label: 'Profile Picture URL',
      id: 'profilePicture',
      placeholder: 'https://example.com/photo.jpg',
      value: profilePictureURL,
      onChange: (profilePictureURL: string) =>
        setProfilePictureUrl(profilePictureURL),
    },
  ];

  const handleSubmit = () => {
    useUpdateContactMutation().mutate({
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
        return <Paragraph>Loading...</Paragraph>;
      }
      case 'loading': {
        return <Paragraph>Loading...</Paragraph>;
      }
      case 'error': {
        return <Paragraph>Error...</Paragraph>;
      }
      case 'success': {
        return <Form fields={fields} onSubmit={handleSubmit} />;
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
