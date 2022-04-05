import { LoadingOverlay, Table } from '@mantine/core';

import { Address } from '@/internal';
import { AddressText } from '@/mantine/components/AddressText';
import { BalanceText } from '@/mantine/components/BalanceText';

interface AddressTableProps {
  addresses: Address[];
  loading?: boolean;
}

export function AddressTable({
  addresses,
  loading = false,
}: AddressTableProps) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Address</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <LoadingOverlay visible={loading} />
        {!loading &&
          addresses.map((address) => (
            <tr key={address.id}>
              <td>
                <AddressText value={address.address} />
              </td>
              <td>
                <BalanceText value={address.balance} />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
