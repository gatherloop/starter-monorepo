import { Input, Label, Text, YStack } from 'tamagui';

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
    <YStack>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.nativeEvent.text)}
      />
      {props.helpTextMessage && (
        <Text fontSize="$3">{props.helpTextMessage}</Text>
      )}
      {props.errorMessage && (
        <Text color={'$red10Light'} fontSize="$4">
          {props.errorMessage}
        </Text>
      )}
    </YStack>
  );
};

export default InputField;
