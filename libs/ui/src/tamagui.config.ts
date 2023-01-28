import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config-base';
import { createInterFont } from '@tamagui/font-inter';

const interFont = createInterFont();

export const appConfig = createTamagui({
  ...config,
  fonts: { body: interFont, heading: interFont },
});

export type AppConfig = typeof appConfig;

declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
