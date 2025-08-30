import React, { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@components/Header';
import Content from '@components/Content';
import Footer from '@components/Footer';

import { ModalProvider } from '@context/ModalContext';

import { State, StateProvider } from '@context/StateContext';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export type Pages = 'Home' | 'Badge' | 'Skill';

type AppProps = {
  initialState: State;
  firstTime: boolean;
};

function CollectSkills({ initialState, firstTime }: AppProps) {
  const [currentPage, setCurrentPage] = useState<Pages>('Home');

  return (
    <>
      <StateProvider initialState={initialState}>
        <DndProvider backend={HTML5Backend}>
          <ModalProvider firstTime={firstTime}>
            <ToastContainer />
            <Header />
            <Content currentPage={currentPage} />
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </ModalProvider>
        </DndProvider>
      </StateProvider>
    </>
  );
}

export default CollectSkills;
