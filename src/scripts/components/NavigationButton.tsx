import React from 'react';
import './NavigationButton.scss';
import { Pages } from '@components/CollectSkills';
import { useDropManager } from '@hooks/useDropManager';

type NavigationButtonProps = {
  id: string;
  label: string;
  page: Pages;
  isDropable?: boolean;
  currentPage: Pages;
  setCurrentPage: (page: Pages) => void;
};

export default function NavigationButton({
  id,
  label,
  page,
  currentPage,
  setCurrentPage,
  isDropable = false,
}: NavigationButtonProps) {
  const { isOver, drop } = useDropManager(isDropable);

  return (
    <button
      ref={drop}
      style={{ transform: isDropable && isOver ? 'scale(1.2)' : 'scale(1)' }}
      id={id}
      className="nav-button"
      aria-label={label}
      disabled={currentPage === page}
      onClick={() => {
        setCurrentPage(page);
      }}
    >
      <img alt="" />
    </button>
  );
}
