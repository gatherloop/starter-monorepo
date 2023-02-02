import { Button, Spinner, YStack } from 'tamagui';
import { Container, InputField, InputFieldProps } from '../../molecules';
import { SkeletonItem } from '../../molecules/skeleton';

export interface FormPops {
  fields: InputFieldProps[];
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Form = (props: FormPops) => {
  return (
    <Container>
      <YStack space="$2" padding="$6">
        {props.fields.map((field) => (
          <InputField key={field.id} {...field} />
        ))}
        {props.isSubmitting ? (
          <Spinner size="large" />
        ) : (
          <SkeletonItem>
            <Button onPress={props.onSubmit} theme="blue" marginTop="$4">
              Submit
            </Button>
          </SkeletonItem>
        )}
      </YStack>
    </Container>
  );
};

export default Form;
