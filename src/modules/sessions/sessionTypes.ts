export interface SessionRecord {
  timestamp: string;
  action: string;
  payload?: any;
}

export interface SessionLog {
  id: string;          // session id
  records: SessionRecord[];
}
