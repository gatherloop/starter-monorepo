import React from 'react';
import { Button, YStack } from 'tamagui';
import { Container, InputField, InputFieldProps } from '../../molecules';

interface FormPops {
  fields: InputFieldProps[];
  onSubmit: () => void;
}

export const Form = (props: FormPops) => {
  return (
    <Container>
      <YStack space="$2" padding="$6">
        {props.fields.map((field) => (
          <InputField key={field.id} {...field} />
        ))}
        <Button onPress={props.onSubmit} theme="blue" marginTop="$4">
          Submit
        </Button>
      </YStack>
    </Container>
  );
};

export default Form;
