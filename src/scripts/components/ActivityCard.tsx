import React from 'react';
import { Activity } from '@model/Activity';
import './ActivityCard.scss';
import { useStateContext } from '@context/StateContext';
import { Translation } from '@/Translations';
import { useModalContext } from '@context/ModalContext';
import { useDragManager } from '@hooks/useDragManager';

type ActivityProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityProps) {
  const modalContext = useModalContext();
  const history = useStateContext().state.history;
  const lastAbsolvedDate = history.getLastAbsolvedAsString(activity.id);

  const { drag, isDragging } = useDragManager(activity);

  function openModal() {
    modalContext.showModal({ modalType: 'activity', content: activity });
  }

  function getStatusIcon(): React.JSX.Element {
    if (!activity.isAbsolved) {
      return <i className={'gg-square-empty'} />;
    }
    return activity.isOneTime ? (
      <i className="gg-square-checked"></i>
    ) : (
      <div className="x-times-icon">{activity.absolveCount}</div>
    );
  }

  return (
    <button
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={'activity-card ' + activity.getStatusClassname()}
      aria-label={Translation.translate('button_label_change_activity_status', {
        '@activitydescr': activity.description,
      })}
      onClick={openModal}
      draggable={true}
    >
      <div className={'description'}>
        <div>{getStatusIcon()}</div>
        <p className={'activity-description-paragraph'}>
          {activity.description}
        </p>
      </div>
      {activity.isAbsolved && (
        <div className={'completion-date'}>
          {Translation.translate('last_absolved', {
            '@date': lastAbsolvedDate,
          })}
        </div>
      )}
    </button>
  );
}
