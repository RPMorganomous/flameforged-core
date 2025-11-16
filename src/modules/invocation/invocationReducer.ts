import type { InvocationState } from './invocationTypes';
import type { RitualStep } from './InvocationPipeline';

export type InvocationAction =
  | { type: 'BEGIN_INVOCATION' }
  | { type: 'END_INVOCATION'; output: string }
  | { type: 'ERROR_INVOCATION'; error: string }
  | { type: 'QUEUE_STEP'; step: RitualStep }
  | { type: 'STEP_COMPLETE'; stepId: string }
  | { type: 'ACTION_COMPLETE'; actionId: string };

export interface InvocationReducerState {
  state: InvocationState;
  output: string;
  error?: string;
}

export const initialState: InvocationReducerState = {
  state: 'idle',
  output: '',
  error: undefined,
};

export function invocationReducer(
  state: InvocationReducerState,
  action: InvocationAction
): InvocationReducerState {
  switch (action.type) {
    case 'BEGIN_INVOCATION':
      return {
        ...state,
        state: 'invoking',
        error: undefined,
      };
    case 'END_INVOCATION':
      return {
        ...state,
        state: 'complete',
        output: action.output,
        error: undefined,
      };
    case 'ERROR_INVOCATION':
      return {
        ...state,
        state: 'error',
        error: action.error,
      };
    case 'QUEUE_STEP':
      // Acknowledge step queued - no state change
      return state;
    case 'STEP_COMPLETE':
      return {
        ...state,
        output: `Step complete: ${action.stepId}`,
      };
    case 'ACTION_COMPLETE':
      return {
        ...state,
        output: `Action complete: ${action.actionId}`,
      };
    default:
      return state;
  }
}
