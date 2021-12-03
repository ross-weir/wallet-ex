import Stack from '@kiwicom/orbit-components/lib/Stack';
import Text from '@kiwicom/orbit-components/lib/Text';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import { useState } from 'react';
import WalletRestoreWizard from '../WalletRestoreWizard';
import { Button, Modal, Form } from 'semantic-ui-react';

function WalletActionView() {
  const [showModal, setShowModal] = useState('');

  const closeModal = () => setShowModal('');

  const onSubmit = () => undefined;

  const onCompleted = () => closeModal();

  const renderModal = () => (
    <Modal
      as={Form}
      size="small"
      onClose={closeModal}
      open={!!showModal}
      onChange={() => console.log('change')}
      onSubmit={() => console.log('submit')}
    >
      <Modal.Header>Restore Wallet</Modal.Header>
      <Modal.Content>
        <WalletRestoreWizard
          onCompleted={onCompleted}
          onSubmit={onSubmit}
          onCancel={closeModal}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" primary>
          Test
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <Stack>
      {!!showModal && renderModal()}
      <Button onClick={() => setShowModal('restore')}>Restore</Button>
      <Button onClick={() => setShowModal('create')}>Create</Button>
    </Stack>
  );
}

export default WalletActionView;
