import { TamaguiProvider, YStack } from 'tamagui';
import { appConfig } from '../src/tamagui.config';
import { useDarkMode } from 'storybook-dark-mode';

export const decorators = [
  (Story) => {
    const theme = useDarkMode() ? 'dark' : 'light';
    return (
      <TamaguiProvider config={appConfig} defaultTheme={theme}>
        <YStack height="100vh" padding="$5" backgroundColor={'$background'}>
          {Story()}
        </YStack>
      </TamaguiProvider>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
};
