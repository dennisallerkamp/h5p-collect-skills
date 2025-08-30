import { Translation } from '@/Translations';
import React, { ReactNode } from 'react';
import './ActivityList.scss';

type ActivityListProps = {
  headlineTranslationKey: string;
  children: ReactNode;
};

export default function ActivityList({
  headlineTranslationKey,
  children,
}: ActivityListProps) {
  return (
    <div className={'activity-list-container'}>
      <h4>{Translation.translate(headlineTranslationKey)}</h4>
      <div className={'activity-list'}>{children}</div>
    </div>
  );
}
