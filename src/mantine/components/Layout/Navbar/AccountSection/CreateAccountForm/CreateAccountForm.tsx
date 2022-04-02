import {
  capitalize,
  getIconForBlockchain,
  getNetworksForBlockchain,
  getSupportedBlockchains,
} from '@/internal';
import { SelectItemImage } from '@@/components/SelectItemImage/SelectItemImage';
import { StackedForm } from '@@/components/Form';
import { Avatar, Select, SelectItem, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReactElement, useState } from 'react';
import { CreateAccountSchema } from './schema';

interface CreateAccountFormProps {
  onCancel: () => void;
  onSubmit: (form: CreateAccountSchema) => void;
}

export function CreateAccountForm({
  onCancel,
  onSubmit,
}: CreateAccountFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateAccountSchema>({
    initialValues: {
      accountName: '',
      blockchain: '',
    },
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

  const handleSubmit = (values: CreateAccountSchema) => {
    const [blockchain, network] = values.accountName.split('.');

    // onSubmit({ blockchain, network, name });
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
        label="Name"
        placeholder="Name"
        {...form.getInputProps('accountName')}
      />
      <Select
        required
        label="Blockchain"
        placeholder="Blockchain"
        itemComponent={SelectItemImage}
        data={blockchainOpts()}
        icon={getSelectIcon(form.values.blockchain)}
        {...form.getInputProps('blockchain')}
      />
    </StackedForm>
  );
}
