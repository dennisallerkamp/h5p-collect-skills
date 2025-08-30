import { Badge } from './Badge';
import { State, useStateContext } from '@context/StateContext';
import Skill from '@model/Skill';

export class Specialist extends Badge {
  constructor() {
    super('badge_2_name', 'badge_2_descr', 1, false);
  }

  calculateLevel(state?: State): number {
    if (!state) state = useStateContext().state;
    const skills: Skill[] = state.skills;

    let absolved5Times = false;
    skills.forEach((skill) => {
      skill.activities.forEach((activity) => {
        if (activity.absolveCount >= 5) {
          absolved5Times = true;
        }
      });
    });
    return absolved5Times ? 1 : 0;
  }
}
