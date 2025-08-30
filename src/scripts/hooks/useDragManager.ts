import { useDrag } from 'react-dnd';
import { Activity } from '@model/Activity';

export function useDragManager(activity: Activity) {
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
    isDragging,
    drag,
  };
}
