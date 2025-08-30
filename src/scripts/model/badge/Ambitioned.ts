import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';

export class Ambitioned extends Badge {
  constructor() {
    super('badge_5_name', 'badge_5_descr', 4, false);
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;

    let amountOfActivitiesToday = 0;

    state.history.entries.forEach((entry) => {
      if (entry.date.toDateString() === new Date().toDateString()) {
        amountOfActivitiesToday++;
      }
    });
    return amountOfActivitiesToday >= 5 ? 1 : 0;
  }
}
