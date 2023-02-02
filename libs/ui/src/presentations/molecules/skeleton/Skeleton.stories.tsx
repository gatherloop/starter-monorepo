import React from 'react';
import { Skeleton } from './Skeleton';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button, Paragraph, YStack, Avatar } from 'tamagui';
import { SkeletonItem } from './SkeletonItem';
import { getAssetSrc } from '../../../utils';

export default {
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args}>
    <YStack space="$2">
      <SkeletonItem variant="circular">
        <Avatar size={25} circular>
          <Avatar.Image src={getAssetSrc('images/Avatar')} />
        </Avatar>
      </SkeletonItem>

      <SkeletonItem variant="inline">
        <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
      </SkeletonItem>

      <SkeletonItem variant="inline">
        <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
      </SkeletonItem>

      <SkeletonItem>
        <Button>Click Me</Button>
      </SkeletonItem>
    </YStack>
  </Skeleton>
);

export const IsNotLoading = Template.bind({});
IsNotLoading.args = {
  isLoading: false,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};
