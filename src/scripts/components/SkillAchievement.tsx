import React from 'react';
import { Translation } from '@/Translations';
import Skill from '@model/Skill';
import { useSkillDetails } from '@hooks/useSkillDetails';

import './SkillAchievement.scss';
import { useModalContext } from '@context/ModalContext';
import Icon from '@components/Icon';
import SkillMedal from '@components/SkillMedal';

type SkillAchievementProps = {
  skill: Skill;
};

export default function SkillAchievement({ skill }: SkillAchievementProps) {
  const modalContext = useModalContext();

  const { absolveCount, level, progressBarWidth, skillLevelText } =
    useSkillDetails(skill);

  function openModal() {
    modalContext.showModal({ modalType: 'skill', content: skill });
  }

  return (
    <button
      className={'skill-card'}
      tabIndex={0}
      aria-label={Translation.translate('button_label_skill_details', {
        '@skillName': skill.name,
      })}
      onClick={openModal}
    >
      <Icon
        path={skill.image.path}
        alt={skill.name + '-image'}
        className={'achievement'}
      />
      <div className={'skill-div'}>
        <h3 className={'skill-headline'}>{skill.name}</h3>
        <div className={'skill-level-text'}>{skillLevelText}</div>
        <div className="skill-progress-bar">
          <div className="unfilled" />
          {absolveCount > 0 && (
            <div className="filled" style={{ width: progressBarWidth }} />
          )}
        </div>
        <SkillMedal level={level} />
      </div>
    </button>
  );
}
