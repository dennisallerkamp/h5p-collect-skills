import React from 'react';
import { Translation } from '@/Translations';
import './ManualButton.scss';
import { useModalContext } from '@context/ModalContext';

function ManualButton() {
  const context = useModalContext();

  function openManual() {
    context.showModal({ modalType: 'manual', content: null });
  }

  return (
    <>
      <button
        className="manual-button"
        aria-label={Translation.translate('button_label_manual')}
        tabIndex={0}
        onClick={openManual}
      >
        <p>?</p>
      </button>
    </>
  );
}

export default ManualButton;
