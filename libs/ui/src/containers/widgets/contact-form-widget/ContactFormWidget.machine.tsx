import React from 'react';
import { match } from 'ts-pattern';
import { contactApi, GetContactByID } from '../../../domains';

type FormValues = {
  name: string;
  phone: string;
  profilePictureURL: string;
};

type State =
  | { type: 'idle' }
  | { type: 'loading'; id: number }
  | { type: 'error'; message: string }
  | { type: 'formReady'; formValues: FormValues }
  | { type: 'creating'; formValues: FormValues }
  | { type: 'updating'; formValues: FormValues; id: number }
  | { type: 'submittingError'; message: string }
  | { type: 'submittingSuccess'; formValues: FormValues };

type Action =
  | { type: 'INIT_FORM_VALUES'; formValues: FormValues }
  | { type: 'FETCH'; id: number }
  | { type: 'FETCH_SUCCESS'; data: GetContactByID }
  | { type: 'FETCH_ERROR'; message: string }
  | { type: 'CHANGE_PAYLOAD'; formValues: FormValues }
  | { type: 'CREATE' }
  | { type: 'UPDATE'; id: number }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; message: string };

const reducer = (state: State, action: Action): State => {
  return match<[State, Action], State>([state, action])
    .with([{ type: 'idle' }, { type: 'INIT_FORM_VALUES' }], ([_, action]) => ({
      type: 'formReady',
      formValues: action.formValues,
    }))
    .with([{ type: 'idle' }, { type: 'FETCH' }], ([_, action]) => ({
      type: 'loading',
      id: action.id,
    }))
    .with([{ type: 'loading' }, { type: 'FETCH_SUCCESS' }], ([_, action]) => ({
      type: 'formReady',
      formValues: {
        name: action.data.data.name,
        phone: action.data.data.phone,
        profilePictureURL: action.data.data.profilePictureURL,
      },
    }))
    .with([{ type: 'loading' }, { type: 'FETCH_ERROR' }], ([_, action]) => ({
      type: 'error',
      message: action.message,
    }))
    .with(
      [{ type: 'formReady' }, { type: 'CHANGE_PAYLOAD' }],
      ([_, action]) => ({
        type: 'formReady',
        formValues: action.formValues,
      })
    )
    .with([{ type: 'formReady' }, { type: 'CREATE' }], ([state]) => ({
      type: 'creating',
      formValues: state.formValues,
    }))
    .with([{ type: 'creating' }, { type: 'SUBMIT_SUCCESS' }], ([state]) => ({
      type: 'submittingSuccess',
      formValues: state.formValues,
    }))
    .with([{ type: 'creating' }, { type: 'SUBMIT_ERROR' }], ([_, action]) => ({
      type: 'submittingError',
      message: action.message,
    }))
    .with([{ type: 'formReady' }, { type: 'UPDATE' }], ([state, action]) => ({
      type: 'updating',
      formValues: state.formValues,
      id: action.id,
    }))
    .with([{ type: 'updating' }, { type: 'SUBMIT_SUCCESS' }], ([state]) => ({
      type: 'submittingSuccess',
      formValues: state.formValues,
    }))
    .with([{ type: 'updating' }, { type: 'SUBMIT_ERROR' }], ([_, action]) => ({
      type: 'submittingError',
      message: action.message,
    }))
    .otherwise(() => state);
};

type Config = {
  variant:
    | { type: 'create' }
    | {
        type: 'update';
        initialData?: GetContactByID;
        id: number;
      };
  onSubmitSuccess?: () => void;
  onSubmitError?: (message: string) => void;
};

const onChange = (
  state: State,
  dispatch: (action: Action) => void,
  config: Config
) => {
  match(state)
    .with({ type: 'idle' }, () => {
      if (config.variant.type === 'create') {
        dispatch({
          type: 'INIT_FORM_VALUES',
          formValues: { name: '', phone: '', profilePictureURL: '' },
        });
      } else if (config.variant.type === 'update') {
        dispatch({ type: 'FETCH', id: config.variant.id });
      }
    })
    .with({ type: 'loading' }, ({ id }) =>
      contactApi
        .getContactByID({ id })
        .then((data) => dispatch({ type: 'FETCH_SUCCESS', data }))
        .catch((err) => dispatch({ type: 'FETCH_ERROR', message: err.message }))
    )
    .with({ type: 'creating' }, (state) =>
      contactApi
        .createContact({ createContactRequest: state.formValues })
        .then(() => dispatch({ type: 'SUBMIT_SUCCESS' }))
        .catch((err) =>
          dispatch({ type: 'SUBMIT_ERROR', message: err.message })
        )
    )
    .with({ type: 'updating' }, async (state) =>
      contactApi
        .updateContactByID({
          id: state.id,
          updateContactRequest: state.formValues,
        })
        .then(() => dispatch({ type: 'SUBMIT_SUCCESS' }))
        .catch((err) =>
          dispatch({ type: 'SUBMIT_ERROR', message: err.message })
        )
    )
    .with({ type: 'submittingSuccess' }, () => {
      if (config.onSubmitSuccess) config.onSubmitSuccess();
    })
    .with({ type: 'submittingError' }, (state) => {
      if (config.onSubmitError) config.onSubmitError(state.message);
    })
    .otherwise(() => null);
};

const initialState = (initialData?: GetContactByID): State => {
  return typeof initialData === 'undefined'
    ? { type: 'idle' }
    : {
        type: 'formReady',
        formValues: {
          name: initialData.data.name,
          phone: initialData.data.phone,
          profilePictureURL: initialData.data.profilePictureURL,
        },
      };
};

export const useContactWidgetMachine = (
  config: Config,
  initialData?: GetContactByID
) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState(initialData)
  );

  React.useEffect(() => {
    onChange(state, dispatch, config);
  }, [state, config]);

  return [state, dispatch] as const;
};
