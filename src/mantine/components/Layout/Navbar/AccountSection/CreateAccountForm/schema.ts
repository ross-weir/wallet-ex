import * as Yup from 'yup';
import { i18n } from '@/internal';

const { t } = i18n;

export interface CreateAccountSchema {
  accountName: string;
  blockchain: string;
}

export const schema = Yup.object().shape({
  accountName: Yup.string()
    .required(t('walletView:createAccount:nameRequiredErr'))
    .max(20, t('walletView:createAccount:nameCharacterLimitErr')),
  blockchain: Yup.string().required(
    t('form:error:required', {
      fieldName: '',
    }),
  ),
});
