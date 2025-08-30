import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';
import Skill from '@model/Skill';

export class Expert extends Badge {
  constructor() {
    super('badge_4_name', 'badge_4_descr', 3, false);
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;
    const skills: Skill[] = state.skills;

    let allActivitiesAbsolved = true;
    skills.forEach((skill) => {
      skill.activities.forEach((activity) => {
        if (!activity.isAbsolved) {
          allActivitiesAbsolved = false;
        }
      });
    });

    return allActivitiesAbsolved ? 1 : 0;
  }
}
