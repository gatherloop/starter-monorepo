import React from 'react';
import { Button, YStack } from 'tamagui';
import { Container, InputField, InputFieldProps } from '../../molecules';
import { SkeletonItem } from '../../molecules/skeleton';

export interface FormPops {
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
        <SkeletonItem>
          <Button onPress={props.onSubmit} theme="blue" marginTop="$4">
            Submit
          </Button>
        </SkeletonItem>
      </YStack>
    </Container>
  );
};

export default Form;
