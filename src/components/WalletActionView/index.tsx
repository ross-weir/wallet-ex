import Stack from '@kiwicom/orbit-components/lib/Stack';
import Text from '@kiwicom/orbit-components/lib/Text';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Button from '@kiwicom/orbit-components/lib/Button';
import Box from '@kiwicom/orbit-components/lib/Box';
import Modal, { ModalSection } from '@kiwicom/orbit-components/lib/Modal';
import { useState } from 'react';
import WalletRestoreWizard from '../WalletRestoreWizard';
import Inline from '@kiwicom/orbit-components/lib/Inline';

function WalletActionView() {
  const [showModal, setShowModal] = useState('');

  const closeModal = () => setShowModal('');

  const onSubmit = () => undefined;

  const onCompleted = () => closeModal();

  const renderModal = () => (
    <Modal onClose={closeModal}>
      <ModalSection>
        <WalletRestoreWizard
          onCompleted={onCompleted}
          onSubmit={onSubmit}
          onCancel={closeModal}
        />
      </ModalSection>
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
