import { Configuration } from 'libs/ui/__generated__/contract';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const config = new Configuration({
  basePath: publicRuntimeConfig.apiURL,
});
