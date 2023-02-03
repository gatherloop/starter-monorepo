import React from 'react';
import { YStack } from 'tamagui';

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container(props: ContainerProps) {
  return (
    <YStack
      marginHorizontal="auto"
      width="100%"
      $gtSm={{ width: 768 }}
      $gtMd={{ width: 1024 }}
      $gtLg={{ width: 1280 }}
      paddingHorizontal="$1"
    >
      {props.children}
    </YStack>
  );
}
