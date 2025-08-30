import { Badge } from './Badge';
import { State } from '@context/StateContext';

export class Master extends Badge {
  constructor(private readonly allEarnedBadges: number) {
    super('badge_8_name', 'badge_8_descr', 7, true);
    this.allEarnedBadges = allEarnedBadges;
  }

  calculateLevel(state?: State): number {
    const amountOfAllEarnedBadges = this.allEarnedBadges;
    if (amountOfAllEarnedBadges >= 8) return 3;
    if (amountOfAllEarnedBadges >= 5) return 2;
    if (amountOfAllEarnedBadges >= 1) return 1;
    return 0;
  }
}
