import { TamaguiProvider, YStack } from 'tamagui';
import { appConfig } from '../src/tamagui.config';
import { useDarkMode } from 'storybook-dark-mode';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setConfig } from 'next/config';

setConfig({
  publicRuntimeConfig: {
    // TODO: change this default endpoint to vps server later
    apiURL: 'http://localhost:3000',
  },
});

const queryClient = new QueryClient();

export const decorators = [
  (Story) => {
    const theme = useDarkMode() ? 'dark' : 'light';
    return (
      <TamaguiProvider config={appConfig} defaultTheme={theme}>
        <QueryClientProvider client={queryClient}>
          <YStack height="100vh" padding="$5" backgroundColor={'$background'}>
            {Story()}
          </YStack>
        </QueryClientProvider>
      </TamaguiProvider>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
};
