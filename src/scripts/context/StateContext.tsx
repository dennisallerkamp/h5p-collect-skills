import React, {
  createContext,
  useReducer,
  useContext,
  ReactElement,
} from 'react';
import ActivityHistory from '../model/ActivityHistory';
import Skill from '@model/Skill';

// Context to store state
export const StateContext = createContext(undefined);

interface Action {
  type: 'ABSOLVE_ACTIVITY' | 'UNDO_ACTIVITY';
  activityId: string;
}

export interface State {
  history: ActivityHistory;
  skills: Skill[];
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ABSOLVE_ACTIVITY': {
      const newState = absolveActivity(state, action);
      (H5P as any).CollectSkills.storeState({ history: newState.history });

      return newState;
    }

    case 'UNDO_ACTIVITY': {
      const newState = undoActivity(state, action);
      (H5P as any).CollectSkills.storeState({ history: newState.history });

      return newState;
    }

    default: {
      return state;
    }
  }
};

const absolveActivity = (state: State, action: Action): State => {
  state.skills.forEach((skill) => {
    skill.activities
      .find((activity) => activity.id === action.activityId)
      ?.markAsAbsolved();
  });

  const updatedHistory: ActivityHistory = new ActivityHistory([
    ...state.history.entries,
  ]);
  updatedHistory.addEntry({ date: new Date(), activityId: action.activityId });

  return {
    history: updatedHistory,
    skills: state.skills,
  };
};

const undoActivity = (state: State, action: Action): State => {
  const { history, skills } = state;

  skills.forEach((skill) => {
    skill.activities
      .find((activity) => activity.id === action.activityId)
      ?.undoAbsolve();
  });

  const index = history.findLastAbsolvedIndex(action.activityId);
  history.removeEntryByIndex(index);

  const updatedHistory: ActivityHistory = new ActivityHistory(history.entries);

  return {
    history: updatedHistory,
    skills: skills,
  };
};

// State provider to wrap the app
type StateProviderProps = {
  initialState: State;
  children: ReactElement;
};
export const StateProvider = ({
  initialState,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export function useStateContext() {
  const context: { state: State; dispatch: React.Dispatch<Action> } =
    useContext(StateContext);

  if (context === undefined) {
    throw new Error('useStateContext must be used with a StateContext');
  }

  return context;
}
