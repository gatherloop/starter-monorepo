import React from 'react';
import { match } from 'ts-pattern';
import { GetContactsList, contactApi } from '../../../domains';

type State =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'error'; message: string }
  | { type: 'success'; data: GetContactsList };

type Action =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; data: GetContactsList }
  | { type: 'FETCH_ERROR'; message: string };

const reducer = (state: State, action: Action): State => {
  return match<[State, Action], State>([state, action])
    .with([{ type: 'idle' }, { type: 'FETCH' }], () => ({ type: 'loading' }))
    .with([{ type: 'loading' }, { type: 'FETCH_SUCCESS' }], ([_, action]) => ({
      type: 'success',
      data: action.data,
    }))
    .with([{ type: 'loading' }, { type: 'FETCH_ERROR' }], ([_, action]) => ({
      type: 'error',
      message: action.message,
    }))
    .with([{ type: 'error' }, { type: 'FETCH' }], () => ({ type: 'loading' }))
    .otherwise(() => state);
};

const onChange = (state: State, dispatch: (action: Action) => void) => {
  match(state).with({ type: 'idle' }, () => dispatch({ type: 'FETCH' }));
  match(state).with({ type: 'loading' }, () =>
    contactApi
      .getContacts()
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', data }))
      .catch((err) => dispatch({ type: 'FETCH_ERROR', message: err.message }))
  );
};

const initialState = (initialData?: GetContactsList): State => {
  return typeof initialData === 'undefined'
    ? { type: 'idle' }
    : { type: 'success', data: initialData };
};

export const useContactListWidgetMachine = (initialData?: GetContactsList) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState(initialData)
  );

  React.useEffect(() => {
    onChange(state, dispatch);
  }, [state]);

  return [state, dispatch] as const;
};
