import React from 'react';

type ContextValue = {
  isLoading: boolean;
};

export const SkeletonContext = React.createContext<ContextValue>({
  isLoading: false,
});

export const useSkeletonContext = () => React.useContext(SkeletonContext);
