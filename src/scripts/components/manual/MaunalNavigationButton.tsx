import React from 'react';
import { Translation } from '@/Translations';

type NavigationButtonProps = {
  prefix: string;
  onClick: () => void;
  text: string;
  disabled?: boolean;
  textBeforeIcon?: boolean;
  classNames?: string;
};

export function ManualNavigationButton({
  onClick,
  prefix,
  text,
  classNames = '',
  disabled = false,
  textBeforeIcon = false,
}: NavigationButtonProps) {
  return (
    <button
      id={`manual-${prefix}-bt`}
      className={`nav-btn manual-${prefix}-bt ${classNames}`}
      onClick={onClick}
      style={{ visibility: disabled ? 'hidden' : 'visible' }}
    >
      {textBeforeIcon && <p dangerouslySetInnerHTML={{ __html: text }}></p>}
      <img alt={prefix} className={`manual-${prefix}-bt-img`} />
      {!textBeforeIcon && <p dangerouslySetInnerHTML={{ __html: text }}></p>}
    </button>
  );
}

export function PreviousButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <ManualNavigationButton
      onClick={onClick}
      disabled={disabled}
      text={Translation.translate('prev_bt_descr')}
      prefix={'prev'}
    />
  );
}

export function NextButton({
  onClick,
  isLastStage,
}: {
  onClick: () => void;
  isLastStage: boolean;
}) {
  const description = isLastStage
    ? Translation.translate('ready_bt_descr')
    : Translation.translate('next_bt_descr');
  const className = isLastStage ? 'last-stage' : '';

  return (
    <ManualNavigationButton
      onClick={onClick}
      text={description}
      classNames={className}
      textBeforeIcon={true}
      prefix={'next'}
    />
  );
}
