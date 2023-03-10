//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { withTamagui: createWithTamagui } = require('@tamagui/next-plugin');

process.env.TAMAGUI_TARGET = 'web';

const withTamagui = createWithTamagui({
  config: './libs/ui/src/tamagui.config.ts',
  components: ['tamagui'],
  useReactNativeWebLite: true,
  disableExtraction: process.env.NODE_ENV === 'development',
  excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker'],
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  publicRuntimeConfig: {
    apiURL: process.env.API_URL ?? 'https://gw-starter.gatherloop.co',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = withTamagui(withNx(nextConfig));
