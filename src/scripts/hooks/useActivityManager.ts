import { useToast } from '@hooks/useToast';
import { reducer, useStateContext } from '@context/StateContext';
import { Activity } from '@model/Activity';
import { useModalContext } from '@context/ModalContext';
import Skill, { calcSkillLevel } from '@model/Skill';
import { useBadges } from '@hooks/useBadges';

export function useActivityManager() {
  const context = useStateContext();

  const modalContext = useModalContext();
  const { showAbsolveToast, showUndoToast } = useToast();
  const { badges } = useBadges();

  const absolveActivity = (activity: Activity) => {
    showAbsolveToast('message_successfully_completed_activity');

    showBadgeAchievementModal(activity);
    showSkillAchievementModal(activity);

    context.dispatch({ type: 'ABSOLVE_ACTIVITY', activityId: activity.id });
  };

  const undoActivity = (activity: Activity) => {
    showUndoToast('message_successfully_undone_activity');
    context.dispatch({ type: 'UNDO_ACTIVITY', activityId: activity.id });
  };

  const getAbsolveCountOfSkill = (skill: Skill) => {
    let count = 0;
    skill.activities.forEach((activity) => {
      context.state.history.entries.forEach((entry) => {
        if (entry.activityId === activity.id) {
          count++;
        }
      });
    });
    return count;
  };

  const showSkillAchievementModal = (activity: Activity): void => {
    for (const skill of context.state.skills) {
      if (
        skill.activities.find(
          (skillActivity) => skillActivity.id === activity.id,
        )
      ) {
        const absolveCount = getAbsolveCountOfSkill(skill);
        const newSkillLvl: number = calcSkillLevel(absolveCount + 1);
        if (newSkillLvl > calcSkillLevel(absolveCount)) {
          modalContext.showModal({
            modalType: 'achievement',
            content: { type: skill, newLvl: newSkillLvl },
          });
        }
      }
    }
  };

  const showBadgeAchievementModal = (activity: Activity): void => {
    const badgeLevelsBefore: number[] = [];
    for (const badge of badges) {
      badgeLevelsBefore.push(badge.calculateLevel(context.state));
    }

    const nextState = reducer(context.state, {
      type: 'ABSOLVE_ACTIVITY',
      activityId: activity.id,
    });

    for (let i = 0; i < badges.length; i++) {
      const newLvl = badges[i].calculateLevel(nextState);
      if (badgeLevelsBefore[i] !== newLvl) {
        modalContext.showModal({
          modalType: 'achievement',
          content: { type: badges[i], newLvl: newLvl },
        });
      }
    }

    reducer(nextState, { type: 'UNDO_ACTIVITY', activityId: activity.id });
  };
  return {
    absolveActivity,
    undoActivity,
  };
}
