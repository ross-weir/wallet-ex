import * as Yup from 'yup';

import { i18n } from '@/internal';

const { t } = i18n;

export type AddWalletAction = 'create' | 'restore';

export const walletFormInitialValues = {
  name: '',
  password: '',
  passwordConfirm: '',
  mnemonic: '',
};

export const walletFormSchema = Yup.object({
  name: Yup.string().min(2).max(16).required(),
  password: Yup.string().min(8).required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], t('common:passwordMismatch'))
    .required(),
  mnemonic: Yup.string().test(
    'mnemonic',
    t('addWallet:wrongMnemonicLength'),
    (v) => [12, 15, 24].includes(v?.split(' ').length ?? 0),
  ),
});

export type SoftwareWalletSchema = typeof walletFormInitialValues;
