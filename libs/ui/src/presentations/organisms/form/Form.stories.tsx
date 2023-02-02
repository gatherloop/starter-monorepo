import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Skeleton } from '../../molecules/skeleton';
import { Form } from './Form';

export default {
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: [
    {
      label: 'Name',
      id: 'name',
      placeholder: 'Input your name',
      value: '',
      onChange: (value) => console.log(value),
    },
    {
      label: 'Phone',
      id: 'phone',
      placeholder: '082xxxxxxx',
      value: '',
      onChange: (value) => console.log(value),
    },
    {
      label: 'Profile Picture URL',
      id: 'profilePicture',
      placeholder: 'https://example.com/photo.jpg',
      value: '',
      onChange: (value) => console.log(value),
    },
  ],
};

export const IsLoading = Template.bind({});
IsLoading.decorators = [(Story) => <Skeleton isLoading>{Story()}</Skeleton>];
IsLoading.args = {
  fields: [
    {
      label: 'Name',
      id: 'name',
      placeholder: 'Input your name',
      value: '',
      onChange: (value) => console.log(value),
    },
    {
      label: 'Phone',
      id: 'phone',
      placeholder: '082xxxxxxx',
      value: '',
      onChange: (value) => console.log(value),
    },
    {
      label: 'Profile Picture URL',
      id: 'profilePicture',
      placeholder: 'https://example.com/photo.jpg',
      value: '',
      onChange: (value) => console.log(value),
    },
  ],
};
