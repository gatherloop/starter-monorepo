import { ErrorView, Form, FormProps, Skeleton } from '../../../presentations';
import { YStack, Dialog } from 'tamagui';
import { match } from 'ts-pattern';
import { GetContactByID } from '../../../domains/';
import {
  FormValues,
  useContactWidgetMachine,
} from './ContactFormWidget.machine';

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

  function handleChange(fieldName: keyof FormValues, value: string) {
    dispatch({
      type: 'CHANGE_FORM_VALUE',
      fieldName,
      value,
    });
  }

  function getFieldValue(fieldName: keyof FormValues) {
    return match(state)
      .with({ type: 'idle' }, { type: 'loading' }, { type: 'error' }, () => '')
      .with(
        { type: 'formReady' },
        { type: 'creating' },
        { type: 'updating' },
        { type: 'submittingSuccess' },
        { type: 'submittingError' },
        (state) => state.formValues[fieldName]
      )
      .exhaustive();
  }

  const fields: FormProps['fields'] = [
    {
      label: 'Name',
      id: 'name',
      placeholder: 'Input your name',
      value: getFieldValue('name'),
      onChange: (value) => handleChange('name', value),
    },
    {
      label: 'Phone',
      id: 'phone',
      placeholder: '082xxxxxxx',
      value: getFieldValue('phone'),
      onChange: (value) => handleChange('phone', value),
    },
    {
      label: 'Profile Picture URL',
      id: 'profilePicture',
      placeholder: 'https://example.com/photo.jpg',
      value: getFieldValue('profilePictureURL'),
      onChange: (value) => handleChange('profilePictureURL', value),
    },
  ];

  const renderView = () => {
    return match(state)
      .with({ type: 'idle' }, { type: 'loading' }, () => (
        <Skeleton isLoading>
          <Form fields={fields} />
        </Skeleton>
      ))
      .with({ type: 'error' }, () => (
        <ErrorView
          variant={{
            tag: 'fetching-error',
            onRetryButtonPress: () => {
              if (props.variant.type === 'update')
                dispatch({ type: 'FETCH', id: props.variant.id });
            },
          }}
        />
      ))
      .with({ type: 'formReady' }, () => (
        <Form
          fields={fields}
          onSubmit={() =>
            props.variant.type === 'create'
              ? dispatch({ type: 'CREATE' })
              : dispatch({ type: 'UPDATE', id: props.variant.id })
          }
        />
      ))
      .with({ type: 'creating' }, { type: 'updating' }, () => (
        <Form fields={fields} isSubmitting />
      ))
      .with({ type: 'submittingSuccess' }, () => (
        <>
          <Form fields={fields} />
          <Dialog open>
            <Dialog.Portal>
              <Dialog.Overlay opacity={0.5} />
              <Dialog.Content>
                <Dialog.Description>
                  {props.variant.type === 'create'
                    ? 'Successfully create data'
                    : 'Successfully update data'}
                </Dialog.Description>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </>
      ))
      .with({ type: 'submittingError' }, () => (
        <>
          <Form fields={fields} />
          <Dialog open>
            <Dialog.Portal>
              <Dialog.Overlay
                opacity={0.5}
                onPress={() => dispatch({ type: 'REINPUT' })}
              />
              <Dialog.Content>
                <Dialog.Description>
                  {props.variant.type === 'create'
                    ? 'Failed to create data'
                    : 'Failed to update data'}
                </Dialog.Description>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </>
      ))
      .exhaustive();
  };

  return (
    <YStack alignItems="center" justifyContent="center">
      {renderView()}
    </YStack>
  );
};

export default ContactFormWidget;
