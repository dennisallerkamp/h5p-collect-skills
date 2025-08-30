import React from 'react';

import SkillChecklist from '@components/SkillChecklist';
import { useStateContext } from '@context/StateContext';

import './Page.scss';
import './HomePage.scss';

export default function HomePage() {
  const skills = useStateContext().state.skills;
  return (
    <div id={'activitiesContainer'} className={'page-container'}>
      {skills.map((skill) => (
        <SkillChecklist key={skill.name} skill={skill} />
      ))}
    </div>
  );
}
