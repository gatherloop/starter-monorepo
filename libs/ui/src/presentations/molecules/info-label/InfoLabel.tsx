import { Paragraph, YStack } from 'tamagui';

export interface InfoLabelProps {
  label: string;
  value: string;
}

export function InfoLabel(props: InfoLabelProps) {
  return (
    <YStack space="$2">
      <Paragraph fontSize="$4">{props.label}</Paragraph>
      <Paragraph fontSize="$5" fontWeight="700">
        {props.value}
      </Paragraph>
    </YStack>
  );
}
