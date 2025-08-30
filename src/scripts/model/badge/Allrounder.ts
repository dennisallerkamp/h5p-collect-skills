import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';
import Skill from '@model/Skill';

export class Allrounder extends Badge {
  constructor() {
    super('badge_3_name', 'badge_3_descr', 2, false);
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;
    const skills: Skill[] = state.skills;
    let hasFinishedActivity = false;

    skills.forEach((skill) => {
      hasFinishedActivity = false;

      skill.activities.forEach((activity) => {
        if (activity.isAbsolved) {
          hasFinishedActivity = true;
        }
      });
    });
    return hasFinishedActivity ? 1 : 0;
  }
}
