import React from 'react';
import './SkillMedal.scss';

type SkillMedalProps = {
  level: number;
};

export default function SkillMedal({ level }: SkillMedalProps) {
  return (
    <div className={'skill-medal lvl' + level}>
      <p className="skill-level">{level}</p>
      <img alt="Skill Medaille" draggable="false" className="skill-medal" />
    </div>
  );
}
