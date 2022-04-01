import * as Yup from 'yup';
import { i18n } from '@/i18n';

const { t } = i18n;

console.log(t('common:passwordMismatch'));

export type AddWalletAction = 'create' | 'restore';

export const walletFormInitialValues = {
  name: '',
  password: '',
  passwordConfirm: '',
  mnemonic: '',
  mnemonicPass: '',
  mnemonicPassConfirm: '',
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
  mnemonicPass: Yup.string(),
  mnemonicPassConfirm: Yup.string().when('mnemonicPass', (mnemonicPass) =>
    !!mnemonicPass
      ? Yup.string()
          .oneOf([Yup.ref('mnemonicPass')], t('common:passwordMismatch'))
          .required()
      : Yup.string(),
  ),
});

export type SoftwareWalletSchema = typeof walletFormInitialValues;
