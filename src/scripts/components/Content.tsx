import React from 'react';

import HomePage from '@components/pages/HomePage';
import BadgePage from '@components/pages/BadgePage';
import SkillsPage from '@components/pages/SkillPage';

import './Content.scss';
import { Pages } from '@components/CollectSkills';

type ContentProps = {
  currentPage: Pages;
};

export default function Content({ currentPage }: ContentProps) {
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage />;

      case 'Badge':
        return <BadgePage />;

      case 'Skill':
        return <SkillsPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <main id="collectSkillsMain" className="collect-skills-main">
      {renderPage()}
    </main>
  );
}
