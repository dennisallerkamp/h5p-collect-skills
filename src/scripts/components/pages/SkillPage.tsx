import React from 'react';
import { Translation } from '@/Translations';
import { useStateContext } from '@context/StateContext';
import SkillAchievement from '@components/SkillAchievement';
import GraphButton from '@components/button/GraphButton';

import './Page.scss';

export default function SkillsPage() {
  const context = useStateContext();

  return (
    <div id={'skillPageContainer'} className={'page-container'}>
      <div id={'skillHeader'} className={'page-header'}>
        <h3 className={'headline'}>
          {Translation.translate('skills_headline')}
        </h3>
        <GraphButton />
      </div>
      <div id={'skillContainer'} className={'page-container'}>
        {context.state.skills.map((skill) => (
          <SkillAchievement key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}
