import React, { ReactNode } from 'react';
import CloseButton from './CloseButton';

import './Modal.scss';
import { useModalContext } from '@context/ModalContext';

interface ModalProps {
  id: string;
  headline?: string;
  children: ReactNode;
}

function Modal({ id, headline, children }: ModalProps) {
  const context = useModalContext();

  function closeModal() {
    // context.setModalType("none");
    context.closeModal();
  }

  function closeOnBackgroundTap(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return (
    <div id={id} className="modal" onClick={(e) => closeOnBackgroundTap(e)}>
      <div className="modal-content">
        {headline && <h2 className={'modal-headline'}>{headline}</h2>}
        <CloseButton onClick={closeModal} />
        {children}
      </div>
    </div>
  );
}

export default Modal;
