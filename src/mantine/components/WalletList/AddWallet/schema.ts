import * as Yup from 'yup';

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
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
  mnemonic: Yup.string().test('Failed', (v) => {
    return true;
  }),
  mnemonicPass: Yup.string(),
  mnemonicPassConfirm: Yup.string().when('mnemonicPass', (mnemonicPass) =>
    !!mnemonicPass
      ? Yup.string()
          .oneOf([Yup.ref('mnemonicPass')], 'Passwords must match')
          .required('Must confirm passphrase')
      : Yup.string(),
  ),
});

export type WalletFormSchema = typeof walletFormInitialValues;
