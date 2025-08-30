import { useEffect, useState } from 'react';

export function useIsLastStageCheck(
  currentStage: number,
  numberOfStages: number,
) {
  const [isLastStage, setIsLastStage] = useState(false);

  useEffect(() => {
    if (currentStage === numberOfStages - 1) {
      return setIsLastStage(true);
    } else {
      return setIsLastStage(false);
    }
  }, [currentStage]);

  return isLastStage;
}
