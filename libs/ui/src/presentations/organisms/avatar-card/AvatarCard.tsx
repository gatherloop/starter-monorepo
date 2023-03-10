import { Avatar, YStack } from 'tamagui';
import { InfoLabel, Card, InfoLabelProps } from '../../molecules';
import { SkeletonItem } from '../../molecules/skeleton';

export interface AvatarCardProps {
  avatarImageSrc?: string;
  items: InfoLabelProps[];
  rightItem?: React.ReactNode;
}

export function AvatarCard(props: AvatarCardProps) {
  return (
    <Card padding="$6">
      <YStack space="$5" $gtXs={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.avatarImageSrc && (
          <SkeletonItem variant="circular">
            <Avatar circular size="$6" alignSelf="center">
              <Avatar.Image defaultSource={{ uri: props.avatarImageSrc }} />
            </Avatar>
          </SkeletonItem>
        )}
        <YStack
          space="$2"
          flex={1}
          $gtXs={{ flexDirection: 'row', space: '$5' }}
        >
          {props.items.map(({ label, value }, index) => (
            <YStack key={index} flexBasis={`${100 / props.items.length}%`}>
              <InfoLabel label={label} value={value} />
            </YStack>
          ))}
        </YStack>
        <SkeletonItem>{props.rightItem}</SkeletonItem>
      </YStack>
    </Card>
  );
}
