import { useMemo } from 'react';
import { useStateContext } from '@context/StateContext';
import { Translation } from '@/Translations';
import Skill, { calcSkillLevel } from '@model/Skill';

export function useSkillDetails(skill: Skill) {
  const stateContext = useStateContext();

  const absolveCount = useMemo(() => {
    let count = 0;
    skill.activities.forEach((activity) => {
      stateContext.state.history.entries.forEach((entry) => {
        if (entry.activityId === activity.id) {
          count++;
        }
      });
    });
    return count;
  }, [skill, stateContext.state.history.entries]);

  const level = useMemo(() => {
    return calcSkillLevel(absolveCount);
  }, [absolveCount]);

  const progressBarWidth = useMemo(() => {
    return level * 20 + '%';
  }, [level]);

  const skillLevelText = useMemo(() => {
    if (absolveCount === 0) {
      return Translation.translate('remaining_activities_for_lvl', {
        '@remainingActivities': '2',
      });
    } else if (absolveCount > 4) {
      return Translation.translate('max_lvl_reached');
    }
    return Translation.translate('remaining_activities_for_lvl', {
      '@remainingActivities': '1',
    });
  }, [absolveCount]);

  return {
    absolveCount,
    level,
    progressBarWidth,
    skillLevelText,
  };
}
