import React from 'react';
import { YStack, YStackProps } from 'tamagui';

interface CardProps extends YStackProps {
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  return (
    <YStack {...props} backgroundColor={'$accent'} borderRadius="$6">
      {props.children}
    </YStack>
  );
};

export default Card;
