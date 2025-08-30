import React from 'react';
import { Translation } from '@/Translations';

import './CloseButton.scss';

type CloseButtonProps = {
  onClick: () => void;
};

function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      className="close"
      tabIndex={0}
      onClick={onClick}
      aria-label={Translation.translate('button_label_close_modal')}
    >
      ×
    </button>
  );
}

export default CloseButton;
