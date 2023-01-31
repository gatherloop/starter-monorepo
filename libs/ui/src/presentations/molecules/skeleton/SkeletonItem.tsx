import React from 'react';
import { useSkeletonContext } from './SkeletonContext';
import { YStack } from 'tamagui';

type SkeletonItemVariant = 'block' | 'inline' | 'circular';

export type SkeletonItemProps = {
  children: React.ReactNode;
  variant?: SkeletonItemVariant;
};

const styles = {
  block: {
    alignItems: 'stretch',
    borderRadius: '$2',
  },
  inline: {
    alignItems: 'flex-start',
    borderRadius: '$2',
  },
  circular: {
    alignItems: 'flex-start',
    borderRadius: '$12',
  },
} as const;

export const SkeletonItem = ({
  children,
  variant = 'block',
}: SkeletonItemProps) => {
  const { alignItems, borderRadius } = styles[variant];
  const { isLoading } = useSkeletonContext();
  return isLoading ? (
    <YStack alignItems={alignItems}>
      <YStack
        backgroundColor="$skeleton"
        borderRadius={borderRadius}
        pointerEvents="none"
      >
        <YStack opacity={0}>{children}</YStack>
      </YStack>
    </YStack>
  ) : (
    <YStack>{children}</YStack>
  );
};
