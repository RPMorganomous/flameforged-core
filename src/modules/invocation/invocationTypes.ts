export type InvocationState = 'idle' | 'invoking' | 'complete' | 'error';

export interface InvocationRequest {
  id: string;
  payload: string;
}

export interface InvocationResponse {
  id: string;
  output: string;
}
