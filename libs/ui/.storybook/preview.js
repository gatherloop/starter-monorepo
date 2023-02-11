import { TamaguiProvider, YStack } from 'tamagui';
import { appConfig } from '../src/tamagui.config';
import { useDarkMode } from 'storybook-dark-mode';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setConfig } from 'next/config';
import { RouterContext } from 'next/dist/shared/lib/router-context';

setConfig({
  publicRuntimeConfig: {
    apiURL: 'https://gw-starter.gatherloop.co',
  },
});

const queryClient = new QueryClient();

export const decorators = [
  (Story) => {
    const theme = useDarkMode() ? 'dark' : 'light';
    return (
      <TamaguiProvider config={appConfig} defaultTheme={theme}>
        <QueryClientProvider client={queryClient}>
          <YStack height="100vh" backgroundColor={'$background'}>
            {Story()}
          </YStack>
        </QueryClientProvider>
      </TamaguiProvider>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
