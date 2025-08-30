import React from 'react';
import { Translation } from '@/Translations';

import BadgeCard from '../BadgeCard';

import './Page.scss';
import './BadgePage.scss';
import { useBadges } from '@hooks/useBadges';

export default function BadgePage() {
  const { badges } = useBadges();

  return (
    <div id={'badgePageContainer'} className={'page-container'}>
      <div id={'badgeHeader'} className={'page-header'}>
        <h3 className={'headline'}>
          {Translation.translate('badge_page_name')}
        </h3>
      </div>
      <div id={'badgeContainer'} className={'page-container'}>
        {badges.map((badge) => {
          return <BadgeCard key={badge.name} badge={badge}></BadgeCard>;
        })}
      </div>
    </div>
  );
}
