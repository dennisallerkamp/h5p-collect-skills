import React from 'react';
import Modal from './Modal';
import { Translation } from '@/Translations';
import './AchievementModal.scss';
import { AchievementContentType, useModalContext } from '@context/ModalContext';
import Skill from '@model/Skill';
import { Badge } from '@model/badge/Badge';
import Icon from '@components/Icon';
import SkillMedal from '@components/SkillMedal';

export default function AchievementModal() {
  const modalContext: AchievementContentType = useModalContext()
    .content as AchievementContentType;
  const newLvl: number = modalContext.newLvl;

  function getSkillAchievementModal(skill: Skill) {
    const description = Translation.translate('achievement_skill_txt', {
      '@newLvl': String(newLvl),
      '@skillName': skill.name,
    });

    return (
      <Modal
        id="achievementModal"
        headline={Translation.translate('achievement_congratulations')}
      >
        <p
          id="achievementModalParagraph"
          className="achievement-modal-paragraph"
        >
          {description}
        </p>
        <div
          id="achievementModalImageDiv"
          className="achievement-modal-image-div"
        >
          <Icon
            path={skill.image.path}
            alt={skill.name}
            className={'achievement-modal'}
          />
          <SkillMedal level={newLvl} />
        </div>
      </Modal>
    );
  }

  function getBadgeAchievementModal(badge: Badge) {
    const description = Translation.translate('achievement_badge_txt', {
      '@newLvl': String(newLvl),
      '@badgeName': badge.name,
    });

    return (
      <Modal
        id="achievementModal"
        headline={Translation.translate('achievement_congratulations')}
      >
        <p
          id="achievementModalParagraph"
          className="achievement-modal-paragraph"
        >
          {description}
        </p>
        <div
          id="achievementModalImageDiv"
          className="achievement-modal-image-div"
        >
          <img
            draggable="false"
            alt={badge.name}
            className={
              'badge-image locked badge-image_' +
              badge.imageIndex +
              ' ' +
              badge.getClassName()
            }
          />
        </div>
      </Modal>
    );
  }

  if (modalContext.type instanceof Skill) {
    return getSkillAchievementModal(modalContext.type as Skill);
  } else {
    return getBadgeAchievementModal(modalContext.type as Badge);
  }
}
