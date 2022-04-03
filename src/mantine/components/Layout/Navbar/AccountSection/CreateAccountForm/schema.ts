import * as Yup from 'yup';

import { i18n } from '@/internal';
import { CreateAccountDto } from '@/internal';
import { Optional } from '@/types';

const { t } = i18n;

export interface CreateAccountFormSchema {
  accountName: string;
  // the value in the selection element must be a string
  // so this field is '{blockchainName}.{network}'
  blockchain: string;
}

// This is the proccssed `CreateAccountFormSchema` that is passed to
// onSubmit callback functions. It expands CreateAccountFormSchema.blockchain
// into individual blockchain/network fields so the abstraction is hidden.
export type CreateAccountProcessedSchema = Optional<
  CreateAccountDto,
  'deriveIdx'
>;

export const createAccountSchema = Yup.object().shape({
  accountName: Yup.string()
    .required(t('walletView:createAccount:nameRequiredErr'))
    .max(20, t('walletView:createAccount:nameCharacterLimitErr')),
  blockchain: Yup.string().required(
    t('form:error:required', {
      fieldName: '',
    }),
  ),
});
