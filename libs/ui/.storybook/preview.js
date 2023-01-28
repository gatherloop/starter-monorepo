import { TamaguiProvider } from 'tamagui';
import { appConfig } from '../src/tamagui.config';
import { useDarkMode } from 'storybook-dark-mode';

export const decorators = [
  (Story) => {
    const theme = useDarkMode() ? 'dark' : 'light';
    return (
      <TamaguiProvider config={appConfig} defaultTheme={theme}>
        {Story()}
      </TamaguiProvider>
    );
  },
];
