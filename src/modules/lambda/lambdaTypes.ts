export interface LambdaResponse<T> {
  ok: boolean;
  data: T | null;
  error?: string;
}
