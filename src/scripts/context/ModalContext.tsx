import React, { createContext, useContext, useEffect, useState } from 'react';
import { Badge } from '@model/badge/Badge';
import Skill from '@model/Skill';
import { Activity } from '@model/Activity';
import Manual from '@/components/manual/Manual';
import AchievementModal from '@/components/modal/AchievementModal';
import ActivityModal from '@/components/modal/ActivityModal';
import BadgeModal from '@/components/modal/BadgeModal';
import DevelopmentModal from '@/components/modal/DevelopmentModal';
import SkillModal from '@/components/modal/SkillModal';

export type ModalType =
  | 'badge'
  | 'skill'
  | 'activity'
  | 'development'
  | 'manual'
  | 'achievement'
  | 'none';
export type ContentType = Badge | Skill | Activity | AchievementContentType;
export type AchievementContentType = { type: Badge | Skill; newLvl: number };
export type Modal = { modalType: ModalType; content: ContentType };

type ModalContextType = {
  content: ContentType;
  modalType: ModalType;
  showModal: (modal: Modal) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModalContext must be used with a ModalContext');
  }

  return context;
}

interface ModalProviderProps {
  children: React.ReactNode;
  firstTime: boolean;
}

// provider for managing modal logic
export const ModalProvider = ({ children, firstTime }: ModalProviderProps) => {
  const [content, setContent] = useState<ContentType>(undefined);
  const [modalType, setModalType] = useState<ModalType>('none');
  const [modalQueue, setModalQueue] = useState<Modal[]>([]);

  const showModal = (modal: Modal) => {
    setModalQueue((prevQueue) => [...prevQueue, modal]);
  };

  const closeModal = () => {
    if (modalQueue.length > 0) {
      const nextModal = modalQueue[0];
      setModalType(nextModal.modalType);
      setContent(nextModal.content);
      setModalQueue((prevQueue) => prevQueue.slice(1));
    } else {
      setModalType('none');
    }
  };

  useEffect(() => {
    if (modalType === 'none' && modalQueue.length > 0) {
      const nextModal = modalQueue[0];
      setModalType(nextModal.modalType);
      setContent(nextModal.content);
      setModalQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [modalType, modalQueue]);

  useEffect(() => {
    if (firstTime) {
      setModalType('manual');
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{ content, modalType, showModal, closeModal }}
    >
      {children}
      {modalType === 'activity' && <ActivityModal />}
      {modalType === 'skill' && <SkillModal />}
      {modalType === 'badge' && <BadgeModal />}
      {modalType === 'development' && <DevelopmentModal />}
      {modalType === 'manual' && <Manual />}
      {modalType === 'achievement' && <AchievementModal />}
    </ModalContext.Provider>
  );
};
