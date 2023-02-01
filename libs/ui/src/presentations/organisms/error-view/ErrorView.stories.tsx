import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ErrorView } from './ErrorView';

export default {
  component: ErrorView,
} as ComponentMeta<typeof ErrorView>;

const Template: ComponentStory<typeof ErrorView> = (args) => (
  <ErrorView {...args} />
);

export const General = Template.bind({});
General.args = { variant: { tag: 'general' } };

export const FetchingError = Template.bind({});
FetchingError.args = {
  variant: {
    tag: 'fetching-error',
    onRetryButtonPress: () => console.log('retry button pressed'),
  },
};

export const EmptyData = Template.bind({});
EmptyData.args = { variant: { tag: 'empty-data' } };
