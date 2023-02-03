import { ContactApi } from '../../__generated__/contract';
import { config } from './config';

export {
  GetContactsList,
  GetContactByID,
  Contact,
} from '../../__generated__/contract';

export const contactApi = new ContactApi(config);
