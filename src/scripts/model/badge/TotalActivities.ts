import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';

export class TotalActivities extends Badge {
  constructor() {
    super('badge_7_name', 'badge_7_descr', 6, true);
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;

    const amountOfFinishedActivities = state.history.entries.length;

    if (amountOfFinishedActivities >= 10) return 3;
    if (amountOfFinishedActivities >= 5) return 2;
    if (amountOfFinishedActivities >= 1) return 1;
    return 0;
  }
}
