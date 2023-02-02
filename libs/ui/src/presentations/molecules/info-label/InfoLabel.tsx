import { Paragraph, YStack } from 'tamagui';
import { SkeletonItem } from '../skeleton';

export interface InfoLabelProps {
  label: string;
  value: string;
}

export function InfoLabel(props: InfoLabelProps) {
  return (
    <YStack space="$2">
      <SkeletonItem variant="inline">
        <Paragraph fontSize="$4">{props.label}</Paragraph>
      </SkeletonItem>
      <SkeletonItem variant="inline">
        <Paragraph fontSize="$5" fontWeight="700">
          {props.value}
        </Paragraph>
      </SkeletonItem>
    </YStack>
  );
}
