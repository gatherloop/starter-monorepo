import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paragraph } from 'tamagui';
import { Container } from './Container';

export default {
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container height="$20" width="$15" padding="$4" {...args}>
    {args.children}
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  children: <Paragraph>Container</Paragraph>,
};
