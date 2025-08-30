import React from 'react';

import Skill from '@model/Skill';
import Modal from '@components/modal/Modal';
import ActivityList from '@components/ActivityList';
import { useModalContext } from '@context/ModalContext';
import { useStateContext } from '@context/StateContext';

import './SkillModal.scss';
import { Activity } from '@model/Activity';
import ActivityListItem from '@components/ActivityListItem';

interface AbsolvedActivityListEntry {
  date: Date;
  activity: Activity;
  count: number;
}

export default function SkillModal() {
  const skill = useModalContext().content as Skill;
  const history = useStateContext().state.history;
  const absolvedActivitiesList = getAbsolvedAcitivityList(skill);

  function getHistoryEntriesForSkill(skill: Skill) {
    return history.entries.filter((entry) => {
      return skill.activities.some(
        (activity) => activity.id === entry.activityId,
      );
    });
  }

  function getAbsolvedAcitivityList(skill: Skill) {
    const absolvedActivitiesList: AbsolvedActivityListEntry[] = [];
    const historyEntries = getHistoryEntriesForSkill(skill);
    historyEntries.forEach((entry) => {
      const activity = skill.activities.find(
        (activity) => activity.id === entry.activityId,
      );
      const existingEntryOnThisDay = absolvedActivitiesList.find(
        (absolvedActivity) => {
          return (
            absolvedActivity.date.toDateString() ===
              entry.date.toDateString() &&
            absolvedActivity.activity.id === activity.id
          );
        },
      );
      if (existingEntryOnThisDay) {
        existingEntryOnThisDay.count++;
      } else {
        absolvedActivitiesList.push({
          date: entry.date,
          activity: activity,
          count: 1,
        });
      }
    });
    absolvedActivitiesList.sort((a, b) => b.date.getTime() - a.date.getTime());
    return absolvedActivitiesList;
  }

  function divideActivitiesByCompletionStatus(skill: Skill) {
    const absolved: Activity[] = [];
    const notAbsolved: Activity[] = [];
    skill.activities.forEach((activity) => {
      if (activity.isAbsolved) {
        absolved.push(activity);
      } else {
        notAbsolved.push(activity);
      }
    });
    return { absolved: absolved, notAbsolved: notAbsolved };
  }

  const { absolved, notAbsolved } = divideActivitiesByCompletionStatus(skill);

  return (
    <Modal id="skillModal" headline={skill.name}>
      {absolved.length > 0 && (
        <ActivityList headlineTranslationKey={'absolved_activities'}>
          {absolvedActivitiesList.map((entry, index) => {
            return (
              <div key={index} className="finished-activity">
                <div className="list-item finished">
                  {entry.date.toLocaleDateString()}
                </div>
                <div className="list-item description finished">
                  {entry.activity.description}
                </div>
                {entry.count > 1 && (
                  <div className="counter">{entry.count}x</div>
                )}
              </div>
            );
          })}
        </ActivityList>
      )}

      {notAbsolved.length > 0 && (
        <ActivityList headlineTranslationKey={'not_absolved_activities'}>
          {notAbsolved.map((activity) => {
            return (
              <ActivityListItem
                key={activity.id}
                activity={activity}
                isFinished={false}
              />
            );
          })}
        </ActivityList>
      )}
    </Modal>
  );
}
