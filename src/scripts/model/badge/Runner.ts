import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';

export class Runner extends Badge {
  constructor() {
    super('badge_6_name', 'badge_6_descr', 5, true);
  }

  public getStreak(state: State): number {
    const DAY_IN_MS = 1000 * 60 * 60 * 24;
    const dates = state.history.entries.map((entry) =>
      new Date(entry.date.toDateString()).getTime(),
    );
    dates.push(new Date(new Date().toDateString()).getTime()); // add today to the list of dates
    let streak = 0;
    for (let i = dates.length - 1; i > 0; i--) {
      const diff = dates[i] - dates[i - 1];
      if (diff > DAY_IN_MS) break;
      if (diff > 0) streak++;
    }
    return streak;
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;
    const streak = this.getStreak(state);
    if (streak >= 30) return 3;
    if (streak >= 7) return 2;
    if (streak >= 2) return 1;
    return 0;
  }
}
