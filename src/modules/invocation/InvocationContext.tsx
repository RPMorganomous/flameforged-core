import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { InvocationState } from './invocationTypes';
import { invocationReducer, initialState } from './invocationReducer';
import type { RitualStep } from './InvocationPipeline';
import { pushStep } from './InvocationPipeline';
import type { RitualAction } from './InvocationActions';
import { useSession } from '../sessions/SessionContext';
import { wait } from '@/utils/wait';

interface InvocationContextValue {
  invoke: (payload: string) => Promise<void>;
  queueStep: (step: RitualStep) => void;
  queueAction: (action: RitualAction) => void;
  state: InvocationState;
  output: string;
  error?: string;
}

const InvocationContext = createContext<InvocationContextValue | undefined>(undefined);

export const useInvocation = () => {
  const context = useContext(InvocationContext);
  if (!context) {
    throw new Error('useInvocation must be used within InvocationProvider');
  }
  return context;
};

interface InvocationProviderProps {
  children: ReactNode;
}

export const InvocationProvider: React.FC<InvocationProviderProps> = ({ children }) => {
  const [reducerState, dispatch] = useReducer(invocationReducer, initialState);
  const session = useSession();

  const invoke = async (payload: string): Promise<void> => {
    dispatch({ type: 'BEGIN_INVOCATION' });
    session.append('BEGIN_INVOCATION', { payload });

    try {
      // Simulate request with 300ms delay
      await wait(300);

      // Simple echo response
      const output = `Echo: ${payload}`;
      console.log('Invocation Engine Output:', output);

      dispatch({ type: 'END_INVOCATION', output });
      session.append('END_INVOCATION', { output });
    } catch (error) {
      dispatch({
        type: 'ERROR_INVOCATION',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const queueStep = (step: RitualStep): void => {
    dispatch({ type: 'QUEUE_STEP', step });

    pushStep(step);

    // Wait slightly longer than pipeline (200ms + 50ms buffer)
    setTimeout(() => {
      dispatch({ type: 'STEP_COMPLETE', stepId: step.id });
    }, 250);
  };

  const queueAction = (action: RitualAction): void => {
    const step: RitualStep = {
      id: action.id,
      action
    };

    dispatch({ type: 'QUEUE_STEP', step });
    session.append('ACTION_EXECUTE', { type: action.type, id: action.id });
    pushStep(step);

    setTimeout(() => {
      dispatch({ type: 'ACTION_COMPLETE', actionId: action.id });
      session.append('ACTION_COMPLETE', { id: action.id });
    }, 250);
  };

  const value: InvocationContextValue = {
    invoke,
    queueStep,
    queueAction,
    state: reducerState.state,
    output: reducerState.output,
    error: reducerState.error,
  };

  return (
    <InvocationContext.Provider value={value}>
      {children}
    </InvocationContext.Provider>
  );
};
