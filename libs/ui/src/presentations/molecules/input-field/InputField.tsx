import { Input, Label, Paragraph, YStack } from 'tamagui';
import { SkeletonItem } from '../skeleton';

export interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  helpTextMessage?: string;
}

export const InputField = (props: InputFieldProps) => {
  return (
    <YStack space="$2">
      <SkeletonItem variant="inline">
        <Label htmlFor={props.id}>{props.label}</Label>
      </SkeletonItem>
      <SkeletonItem>
        <Input
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={props.onChange}
        />
      </SkeletonItem>

      {props.helpTextMessage && (
        <SkeletonItem variant="inline">
          <Paragraph fontSize="$2">{props.helpTextMessage}</Paragraph>
        </SkeletonItem>
      )}
      {props.errorMessage && (
        <SkeletonItem variant="inline">
          <Paragraph color={'$red10Light'} fontSize="$4">
            {props.errorMessage}
          </Paragraph>
        </SkeletonItem>
      )}
    </YStack>
  );
};

export default InputField;
