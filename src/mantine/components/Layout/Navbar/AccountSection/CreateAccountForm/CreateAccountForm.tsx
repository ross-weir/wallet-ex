import { Avatar, Select, SelectItem, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  capitalize,
  getIconForBlockchain,
  getNetworksForBlockchain,
  getSupportedBlockchains,
  SupportedBlockchain,
} from '@/internal';
import { StackedForm } from '@@/components/Form';
import { SelectItemImage } from '@@/components/SelectItemImage/SelectItemImage';

import {
  CreateAccountFormSchema,
  CreateAccountProcessedSchema,
  createAccountSchema,
} from './schema';

export interface CreateAccountFormProps {
  onCancel: () => void;
  onSubmit: (
    form: CreateAccountProcessedSchema,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => void;
}

export function CreateAccountForm({
  onCancel,
  onSubmit,
}: CreateAccountFormProps) {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateAccountFormSchema>({
    initialValues: {
      accountName: '',
      blockchain: '',
    },
    schema: yupResolver(createAccountSchema),
  });

  const blockchainOpts = (): SelectItem[] => {
    const opts: SelectItem[] = [];

    for (const blockchainName of getSupportedBlockchains()) {
      const networks = getNetworksForBlockchain(blockchainName);

      for (const network of networks) {
        const id = `${blockchainName}.${network}`;

        opts.push({
          key: id,
          label: `${capitalize(blockchainName)} ${capitalize(network)}`,
          value: id,
          image: getIconForBlockchain(blockchainName, network),
          group: capitalize(network),
        });
      }
    }

    return opts;
  };

  const getSelectIcon = (
    value: string,
  ): ReactElement<typeof Avatar> | undefined => {
    if (!value) {
      return;
    }

    const [blockchainName, network] = value.split('.');
    const image = getIconForBlockchain(blockchainName as any, network);

    return <Avatar size="xs" src={image} />;
  };

  const handleSubmit = ({
    blockchain,
    accountName,
  }: CreateAccountFormSchema) => {
    setLoading(true);

    const [blockchainName, network] = blockchain.split('.');

    onSubmit(
      {
        blockchainName: blockchainName as SupportedBlockchain,
        network,
        name: accountName,
      },
      setLoading,
    );
  };

  return (
    <StackedForm
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
      onCancel={onCancel}
      loading={loading}
    >
      <TextInput
        data-autofocus
        required
        label={capitalize(t('name'))}
        placeholder={capitalize(t('name'))}
        {...form.getInputProps('accountName')}
      />
      <Select
        required
        label={capitalize(t('blockchain'))}
        placeholder={capitalize(t('blockchain'))}
        itemComponent={SelectItemImage}
        data={blockchainOpts()}
        icon={getSelectIcon(form.values.blockchain)}
        {...form.getInputProps('blockchain')}
      />
    </StackedForm>
  );
}
