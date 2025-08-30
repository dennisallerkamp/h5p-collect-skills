import { Beginning } from '@model/badge/Beginning';
import { Specialist } from '@model/badge/Specialist';
import { Allrounder } from '@model/badge/Allrounder';
import { Expert } from '@model/badge/Expert';
import { Ambitioned } from '@model/badge/Ambitioned';
import { Runner } from '@model/badge/Runner';
import { TotalActivities } from '@model/badge/TotalActivities';
import { Master } from '@model/badge/Master';

export function useBadges() {
  const getAllEarnedBadges = () => {
    let allEarnedBadges = 0;
    badges.forEach((badge) => {
      if (badge.calculateLevel() > 0) allEarnedBadges++;
    });
    return allEarnedBadges;
  };

  const badges = [
    new Beginning(),
    new Specialist(),
    new Allrounder(),
    new Expert(),
    new Ambitioned(),
    new Runner(),
    new TotalActivities(),
  ];

  const allEarnedBadges = getAllEarnedBadges();
  badges.push(new Master(allEarnedBadges));

  return {
    badges,
  };
}
