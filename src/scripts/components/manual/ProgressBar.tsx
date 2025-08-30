import React from 'react';
import './ProgressBar.scss';

type ProgressBarProps = {
  numberOfStages: number;
  currentStage: number;
};

export default function ProgressBar({
  numberOfStages,
  currentStage,
}: ProgressBarProps) {
  return (
    <div className="progress-bar">
      {[...Array(numberOfStages)].map((_, index) => {
        const uniqueKey = `stage-${index}`;
        return (
          <div
            key={uniqueKey}
            className={
              'progress-point manual-progress-point' +
              (index === currentStage ? ' active-stage' : '')
            }
            id={'manualProgressPoint' + index}
          ></div>
        );
      })}
    </div>
  );
}
