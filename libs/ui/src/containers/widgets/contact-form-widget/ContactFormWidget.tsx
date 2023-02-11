import { ErrorView, Form, Skeleton } from 'libs/ui/src/presentations';
import { AlertDialog, YStack } from 'tamagui';
import { match } from 'ts-pattern';
import { Contact, GetContactByID } from '../../../domains/';
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
  onSubmitSuccess?: () => void;
  onSubmitError?: (message: string) => void;
}

export const ContactFormWidget = (props: ContactFormWidgetProps) => {
  const [state, dispatch] = useContactWidgetMachine(
    {
      variant: props.variant,
      onSubmitSuccess: props.onSubmitSuccess,
      onSubmitError: props.onSubmitError,
    },
    props.variant.type === 'update' ? props.variant.initialData : undefined
  );

  function handleChange(
    fieldName: string,
    value: string,
    state: Omit<Contact, 'id'>
  ) {
    dispatch({
      type: 'CHANGE_PAYLOAD',
      formValues: {
        ...state,
        [fieldName]: value,
      },
    });
  }

  const renderView = () => {
    return match(state)
      .with({ type: 'idle' }, { type: 'loading' }, () => (
        <Skeleton isLoading>
          <Form
            fields={[
              {
                label: 'Name',
                id: 'name',
                placeholder: 'Input your name',
                value: '',
                onChange: () => null,
              },
              {
                label: 'Phone',
                id: 'phone',
                placeholder: '082xxxxxxx',
                value: '',
                onChange: () => null,
              },
              {
                label: 'Profile Picture URL',
                id: 'profilePicture',
                placeholder: 'https://example.com/photo.jpg',
                value: '',
                onChange: () => null,
              },
            ]}
            onSubmit={() => null}
            isSubmitting={false}
          />
        </Skeleton>
      ))
      .with({ type: 'formReady' }, (state) => (
        <Form
          fields={[
            {
              label: 'Name',
              id: 'name',
              placeholder: 'Input your name',
              value: state.formValues.name,
              onChange: (value) =>
                handleChange('name', value, state.formValues),
            },
            {
              label: 'Phone',
              id: 'phone',
              placeholder: '082xxxxxxx',
              value: state.formValues.phone,
              onChange: (value) =>
                handleChange('phone', value, state.formValues),
            },
            {
              label: 'Profile Picture URL',
              id: 'profilePicture',
              placeholder: 'https://example.com/photo.jpg',
              value: state.formValues.profilePictureURL,
              onChange: (value) =>
                handleChange('profilePictureURL', value, state.formValues),
            },
          ]}
          onSubmit={() =>
            props.variant.type === 'create'
              ? dispatch({ type: 'CREATE' })
              : dispatch({ type: 'UPDATE', id: props.variant.id })
          }
          isSubmitting={false}
        />
      ))
      .with({ type: 'creating' }, { type: 'updating' }, (state) => (
        <Form
          fields={[
            {
              label: 'Name',
              id: 'name',
              placeholder: 'Input your name',
              value: state.formValues.name,
              onChange: () => null,
            },
            {
              label: 'Phone',
              id: 'phone',
              placeholder: '082xxxxxxx',
              value: state.formValues.phone,
              onChange: () => null,
            },
            {
              label: 'Profile Picture URL',
              id: 'profilePicture',
              placeholder: 'https://example.com/photo.jpg',
              value: state.formValues.profilePictureURL,
              onChange: () => null,
            },
          ]}
          onSubmit={() => null}
          isSubmitting={true}
        />
      ))
      .with({ type: 'submittingSuccess' }, (state) => (
        <>
          <Form
            fields={[
              {
                label: 'Name',
                id: 'name',
                placeholder: 'Input your name',
                value: state.formValues.name,
                onChange: () => null,
              },
              {
                label: 'Phone',
                id: 'phone',
                placeholder: '082xxxxxxx',
                value: state.formValues.phone,
                onChange: () => null,
              },
              {
                label: 'Profile Picture URL',
                id: 'profilePicture',
                placeholder: 'https://example.com/photo.jpg',
                value: state.formValues.profilePictureURL,
                onChange: () => null,
              },
            ]}
            onSubmit={() => null}
            isSubmitting={false}
          />
          <AlertDialog>
            <AlertDialog.Description>
              {props.variant.type === 'create'
                ? 'Successfully create data'
                : 'Successfully update data'}
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
      .otherwise(() => null);
  };

  return (
    <YStack alignItems="center" justifyContent="center">
      {renderView()}
    </YStack>
  );
};

export default ContactFormWidget;
