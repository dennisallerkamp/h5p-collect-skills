import React from 'react';

import ManualButton from './button/ManualButton';
import FullScreenButton from './button/FullScreenButton';

import './Header.scss';

export default function Header() {
  return (
    <header className="collect-skills-header">
      <ManualButton />
      <FullScreenButton />
    </header>
  );
}
