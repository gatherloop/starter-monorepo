import { InputField } from './InputField';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: InputField,
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Input your name',
  value: '',
  onChange: (value) => console.log(value),
  helpTextMessage: '',
  errorMessage: '',
};

export const HasError = Template.bind({});
HasError.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Input your name',
  value: '',
  onChange: (value) => console.log(value),
  helpTextMessage: '',
  errorMessage: 'Name must be provided',
};

export const HasHelpText = Template.bind({});
HasHelpText.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Input your name',
  value: '',
  onChange: (value) => console.log(value),
  helpTextMessage: 'Make sure you use correct name',
  errorMessage: '',
};

export const HasHelpTextAndHasError = Template.bind({});
HasHelpTextAndHasError.args = {
  id: 'name',
  label: 'Name',
  placeholder: 'Input your name',
  value: '',
  onChange: (value) => console.log(value),
  helpTextMessage: 'Make sure you use correct name',
  errorMessage: 'Name must be provided',
};
