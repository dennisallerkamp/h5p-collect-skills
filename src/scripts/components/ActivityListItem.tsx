import React from 'react';
import { Activity } from '@model/Activity';
import { useStateContext } from '@context/StateContext';

import './ActivityListItem.scss';

type ActivityListItemProps = {
  activity: Activity;
  isFinished?: boolean;
};
export default function ActivityListItem({
  activity,
  isFinished = true,
}: ActivityListItemProps) {
  const history = useStateContext().state.history;
  const lastAbsolvedDate = history.getLastAbsolvedAsString(activity.id);

  function getClassName() {
    if (isFinished) {
      return 'finished';
    }
    return 'unfinished';
  }

  return (
    <>
      {isFinished && (
        <div className={'list-item ' + getClassName()}>{lastAbsolvedDate}</div>
      )}
      <div className={'list-item description ' + getClassName()}>
        {activity.description}
      </div>
      {activity.absolveCount > 1 && (
        <div className="counter">{activity.absolveCount}x</div>
      )}
    </>
  );
}
