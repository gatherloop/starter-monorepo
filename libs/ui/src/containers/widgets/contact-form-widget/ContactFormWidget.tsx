import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from 'libs/ui/src/machines';
import { ErrorView, Form, FormPops, Skeleton } from 'libs/ui/src/presentations';
import React from 'react';
import { AlertDialog, Text, YStack } from 'tamagui';
import { match } from 'ts-pattern';
import { GetContactByID } from '../../../domains/';
import { useContactWidgetMachine } from './ContactFormWidget.machine';

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
  const [state, dispatch] = useContactWidgetMachine(
    {
      variant: props.variant,
    },
    props.variant.type === 'update' ? props.variant.initialData : undefined
  );

  React.useEffect(() => {
    if (state.type === 'formReady') {
      setName(state.formValues.name);
      setPhone(state.formValues.phone);
      setProfilePictureUrl(state.formValues.profilePictureURL);
    }
  }, [state.type]);

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

  const renderView = () => {
    return match(props.variant)
      .with({ type: 'create' }, () =>
        match(state)
          .with({ type: 'formReady' }, (t) => (
            <Form
              fields={fields}
              onSubmit={() => dispatch({ type: 'CREATE' })}
              isSubmitting={false}
            />
          ))
          .with({ type: 'creating' }, () => (
            <Form fields={fields} onSubmit={() => null} isSubmitting={true} />
          ))
          .with({ type: 'submittingSuccess' }, () => (
            <>
              <Form
                fields={fields}
                onSubmit={() => null}
                isSubmitting={false}
              />
              <AlertDialog>
                <AlertDialog.Description>
                  Successfully create data
                </AlertDialog.Description>
              </AlertDialog>
            </>
          ))
          .with({ type: 'error' }, () => (
            <ErrorView
              variant={{
                tag: 'fetching-error',
                onRetryButtonPress: () => null,
              }}
            />
          ))
          .otherwise(() => null)
      )
      .with({ type: 'update' }, () =>
        match(state)
          .with({ type: 'idle' }, { type: 'loading' }, () => (
            <Skeleton isLoading>
              <Form
                fields={fields}
                onSubmit={() => null}
                isSubmitting={false}
              />
            </Skeleton>
          ))
          .with({ type: 'formReady' }, () => (
            <Form
              fields={fields}
              onSubmit={() =>
                dispatch({
                  type: 'UPDATE',
                  id: props.variant.type === 'update' ? props.variant.id : 0,
                })
              }
              isSubmitting={false}
            />
          ))
          .with({ type: 'updating' }, () => (
            <Form fields={fields} onSubmit={() => null} isSubmitting={true} />
          ))
          .with({ type: 'submittingSuccess' }, () => (
            <>
              <Form
                fields={fields}
                onSubmit={() => null}
                isSubmitting={false}
              />
              <AlertDialog>
                <AlertDialog.Description>
                  Successfully update data
                </AlertDialog.Description>
              </AlertDialog>
            </>
          ))
          .with({ type: 'error' }, () => (
            <ErrorView
              variant={{
                tag: 'fetching-error',
                onRetryButtonPress: () => null,
              }}
            />
          ))
          .otherwise(() => null)
      )
      .otherwise(() => null);
  };

  return (
    <YStack alignItems="center" justifyContent="center">
      {renderView()}
    </YStack>
  );
};

export default ContactFormWidget;
