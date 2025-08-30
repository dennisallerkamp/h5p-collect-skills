import React, { useState } from 'react';
import Modal from '../modal/Modal';
import ManualFooter from './ManualFooter';
import ManualPage from './ManualPage';

import './Manual.scss';
import './ManualAnimation.scss';
import { useModalContext } from '@context/ModalContext';
import { pages } from '@/data/manual-data';

function Manual() {
  const context = useModalContext();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const nextPage = () => {
    if (currentPageIndex === pages.length - 1) {
      context.closeModal();
      return;
    }
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const previousPage = () => {
    if (currentPageIndex === 0) return;
    setCurrentPageIndex(currentPageIndex - 1);
  };
  return (
    <Modal id="manualModal">
      <ManualPage
        headline={pages[currentPageIndex].headline}
        text={pages[currentPageIndex].text}
        animation={pages[currentPageIndex].animation}
        id={pages[currentPageIndex].id}
      />
      <ManualFooter
        previousPage={previousPage}
        nextPage={nextPage}
        numberOfStages={pages.length}
        currentStage={currentPageIndex}
      />
    </Modal>
  );
}

export default Manual;
