import React from 'react';
import Modal from './Modal';
import { Badge } from '@model/badge/Badge';

import './BadgeModal.scss';
import { useModalContext } from '@context/ModalContext';
import Status from '@components/modal/Status';

export default function BadgeModal() {
  const modalContext = useModalContext();
  const badge = modalContext.content as Badge;

  return (
    <Modal id="badgeModal">
      <div className="header-container">
        <div id="badgeModalImageDiv" className="badge-modal-image-div">
          <img
            draggable="false"
            alt={badge.name}
            className={
              'badge-image locked badge-image_' +
              badge.imageIndex +
              ' ' +
              badge.getClassName()
            }
          />
        </div>
        <div id="badgeModalHeadlineDiv" className="badge-modal-headline-div">
          <h3>{badge.name}</h3>
        </div>
      </div>
      <div id="badgeModalTextDiv" className="badge-modal-text-div">
        {badge.description}
      </div>
      <Status
        message={badge.getStatusMessage()}
        className={badge.getClassName()}
      />
    </Modal>
  );
}
