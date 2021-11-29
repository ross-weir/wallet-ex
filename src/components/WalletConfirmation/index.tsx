import Illustration from '@kiwicom/orbit-components/lib/Illustration';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Text from '@kiwicom/orbit-components/lib/Text';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Button from '@kiwicom/orbit-components/lib/Button';
import Box from '@kiwicom/orbit-components/lib/Box';

interface Props {
  action: 'Created' | 'Restored';
  onConfirm: () => void;
}

function WalletConfirmation({ action, onConfirm }: Props) {
  return (
    <Stack spacing="large" align="center" direction="column">
      <Illustration name="Success" />
      <Box>
        <Heading type="displaySubtitle" align="center">
          Wallet {action}!
        </Heading>
        <Text align="center">
          It may take some time for transactions and balances to be populated.
        </Text>
      </Box>
      <Button onClick={onConfirm}>Finish</Button>
    </Stack>
  );
}

export default WalletConfirmation;
