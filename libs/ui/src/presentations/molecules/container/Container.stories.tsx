import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paragraph } from 'tamagui';
import { Card } from '../card';
import { Container } from './Container';

export default {
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args}>{args.children}</Container>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <Card padding="$2">
      <Paragraph>Container</Paragraph>
    </Card>
  ),
};
