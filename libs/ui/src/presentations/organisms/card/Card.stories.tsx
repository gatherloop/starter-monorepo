import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';
import { getAssetSrc } from '../../../utils';
import { Skeleton } from '../../molecules/skeleton';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarImageSrc: getAssetSrc('images/Avatar'),
  items: [
    { label: 'Name', value: 'M. Nindra Zaka' },
    { label: 'Phone', value: '085573527382' },
  ],
};

export const IsLoading = Template.bind({});
IsLoading.decorators = [(Story) => <Skeleton isLoading>{Story()}</Skeleton>];
IsLoading.args = {
  avatarImageSrc: getAssetSrc('images/Avatar'),
  items: [
    { label: 'Name', value: 'M. Nindra Zaka' },
    { label: 'Phone', value: '085573527382' },
  ],
};
