import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';

export class Beginning extends Badge {
  constructor() {
    super('badge_1_name', 'badge_1_descr', 0, false);
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;

    return state.history.entries.length > 0 ? 1 : 0;
  }
}
