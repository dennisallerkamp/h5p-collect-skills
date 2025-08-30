import React from 'react';
import { useHasPreviousStageCheck } from '@hooks/useHasPreviousStageCheck';
import { useIsLastStageCheck } from '@hooks/useIsLastStageCheck';
import { PreviousButton, NextButton } from './MaunalNavigationButton';
import ProgressBar from './ProgressBar';

type ManualFooterProps = {
  nextPage: () => void;
  previousPage: () => void;
  numberOfStages: number;
  currentStage: number;
};

export default function ManualFooter({
  nextPage,
  previousPage,
  numberOfStages,
  currentStage,
}: ManualFooterProps) {
  const hasPrevious = useHasPreviousStageCheck(currentStage);
  const isLastStage = useIsLastStageCheck(currentStage, numberOfStages);

  return (
    <div id="manualFooter" className="manual-footer">
      <PreviousButton onClick={previousPage} disabled={!hasPrevious} />
      <ProgressBar
        numberOfStages={numberOfStages}
        currentStage={currentStage}
      />
      <NextButton onClick={nextPage} isLastStage={isLastStage} />
    </div>
  );
}
