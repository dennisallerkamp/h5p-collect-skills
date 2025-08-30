import React from 'react';
import Skill from '@model/Skill';
import ActivityCard from './ActivityCard';
import './SkillChecklist.scss';
import Icon from '@components/Icon';

type SkillProps = {
  skill: Skill;
};

export default function SkillChecklist({ skill }: SkillProps) {
  return (
    <details className={'skill-checklist'} open={true}>
      <summary className={'checklist-header'}>
        <h2 className={'checklist-headline'}>{skill.name}</h2>
        <Icon
          path={skill.image.path}
          alt={skill.name}
          className={'checklist'}
        />
      </summary>
      {skill.activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </details>
  );
}
