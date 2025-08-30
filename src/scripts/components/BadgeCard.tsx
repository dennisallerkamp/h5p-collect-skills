import React from 'react';
import { Translation } from '@/Translations';
import { Badge } from '@model/badge/Badge';

import './BadgeCard.scss';
import { useModalContext } from '@context/ModalContext';

type BadgeProps = {
  badge: Badge;
};

export default function BadgeCard({ badge }: BadgeProps) {
  const modalContext = useModalContext();

  function openBadgeModal() {
    modalContext.showModal({ modalType: 'badge', content: badge });
  }

  return (
    <button
      className={'badge-background'}
      tabIndex={0}
      aria-label={Translation.translate('button_label_badge_details', {
        '@badgeName': badge.name,
      })}
      onClick={openBadgeModal}
    >
      <img
        alt={'Badge'}
        className={
          'badge-image badge-image_' +
          badge.imageIndex +
          ' ' +
          badge.getClassName()
        }
        draggable={false}
      />
      <h5>{badge.name}</h5>
    </button>
  );
}
