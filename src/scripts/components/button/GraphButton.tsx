import React from 'react';
import { Translation } from '@/Translations';
import './GraphButton.scss';
import { useModalContext } from '@context/ModalContext';

export default function GraphButton() {
  const context = useModalContext();

  function openGraphModal() {
    context.showModal({ modalType: 'development', content: null });
  }

  return (
    <button
      id={'graphButton'}
      className={'btn graph-button'}
      onClick={openGraphModal}
    >
      {Translation.translate('dev_graph_bt_label')}
    </button>
  );
}
