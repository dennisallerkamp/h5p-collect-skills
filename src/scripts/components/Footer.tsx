import NavigationButton from './NavigationButton';
import './Footer.scss';
import React from 'react';
import { Pages } from '@components/CollectSkills';

type FooterProps = {
  currentPage: Pages;
  setCurrentPage: (page: Pages) => void;
};

export default function Footer({ currentPage, setCurrentPage }: FooterProps) {
  return (
    <footer id="collectSkillsFooter">
      <div className="nav-button-container">
        <NavigationButton
          id="nav-button-home"
          label="Change to activity page"
          page="Home"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <span className="vertical-divider"></span>
        <NavigationButton
          id="nav-button-badge"
          label="Change to badges-page"
          page="Badge"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="nav-button-container">
        <NavigationButton
          id="nav-button-chest"
          label="Change to skills-page"
          page="Skill"
          isDropable={true}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </footer>
  );
}
