import { useEffect, useState } from 'react';

export function useHasPreviousStageCheck(currentStage: number) {
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    if (currentStage === 0) {
      setHasPrevious(false);
    } else {
      setHasPrevious(true);
    }
  }, [currentStage]);

  return hasPrevious;
}
