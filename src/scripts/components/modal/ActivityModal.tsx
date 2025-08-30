import React from 'react';
import Modal from './Modal';
import { Translation } from '@/Translations';
import './ActivityModal.scss';
import { useModalContext } from '@context/ModalContext';
import { Activity } from '@model/Activity';
import Status from '@components/modal/Status';
import { useActivityManager } from '@hooks/useActivityManager';

export default function ActivityModal() {
  const modalContext = useModalContext();
  const { absolveActivity, undoActivity } = useActivityManager();
  const activity = modalContext.content as Activity;

  return (
    <Modal id="activityModal" headline={Translation.translate('activity')}>
      <p id="activityModalParagraph" className="activity-modal-paragraph">
        {'„' + activity.description + '“'}
      </p>
      <Status
        message={activity.getStatusMessage()}
        className={activity.getStatusClassname()}
      />
      <div className="button-container">
        {activity.canBeAbsolved() && (
          <button
            type="button"
            id="addActivityToBoxButton"
            className="activity-btn"
            onClick={() => absolveActivity(activity)}
          >
            {Translation.translate('absolve_bt_label')}
          </button>
        )}
        {activity.isAbsolved && (
          <button
            type="button"
            id="removeActivityFromBoxButton"
            className="activity-btn"
            onClick={() => undoActivity(activity)}
          >
            {Translation.translate('undo_absolve_bt_label')}
          </button>
        )}
      </div>
    </Modal>
  );
}
