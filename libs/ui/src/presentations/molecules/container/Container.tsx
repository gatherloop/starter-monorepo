import React from 'react';
import { YStack, YStackProps } from 'tamagui';

interface ContainerProps extends YStackProps {
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  return (
    <YStack {...props} backgroundColor={'$accent'} borderRadius="$6">
      {props.children}
    </YStack>
  );
};

export default Container;
