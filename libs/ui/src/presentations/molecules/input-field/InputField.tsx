import { Input, Label, Paragraph, YStack } from 'tamagui';

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
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.nativeEvent.text)}
      />
      {props.helpTextMessage && (
        <Paragraph fontSize="$2">{props.helpTextMessage}</Paragraph>
      )}
      {props.errorMessage && (
        <Paragraph color={'$red10Light'} fontSize="$4">
          {props.errorMessage}
        </Paragraph>
      )}
    </YStack>
  );
};

export default InputField;
