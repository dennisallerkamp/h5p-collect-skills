import { useDrag, useDrop } from 'react-dnd';
import { Activity } from '@model/Activity';
import { useActivityManager } from '@hooks/useActivityManager';

export function useDropManager(isDropable?: boolean, activity?: Activity) {
  const activityManager = useActivityManager();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'ACTIVITY',
      drop: (activity: Activity) => handleDrop(activity),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [activityManager],
  );

  const handleDrop = (activity: Activity) => {
    if (isDropable) {
      if (activity.canBeAbsolved()) {
        activityManager.absolveActivity(activity);
      }
    }
  };

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: 'ACTIVITY',
      item: activity,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  });

  return {
    isOver,
    drop,
    isDragging,
    drag,
  };
}
