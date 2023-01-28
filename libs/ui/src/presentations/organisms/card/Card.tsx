import { Avatar, YStack } from 'tamagui';
import { InfoLabel, Container, InfoLabelProps } from '../../molecules';

export interface CardProps {
  avatarImageSrc?: string;
  items: InfoLabelProps[];
  rightItem?: React.ReactNode;
}

export function Card(props: CardProps) {
  return (
    <Container padding="$6">
      <YStack space="$5" $gtXs={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.avatarImageSrc && (
          <Avatar circular size="$6" alignSelf="center">
            <Avatar.Image src={props.avatarImageSrc} />
          </Avatar>
        )}
        <YStack
          space="$2"
          flex={1}
          $gtXs={{ flexDirection: 'row', space: '$5' }}
        >
          {props.items.map(({ label, value }, index) => (
            <InfoLabel key={index} label={label} value={value} />
          ))}
        </YStack>
        {props.rightItem}
      </YStack>
    </Container>
  );
}
