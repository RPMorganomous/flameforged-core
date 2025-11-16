export interface ScrollMetadata {
  title: string;
  tags: string[];
}

export interface ScrollSection {
  heading: string;
  content: string;
}

export interface ScrollObject {
  metadata: ScrollMetadata;
  sections: ScrollSection[];
  raw: string;
}

export interface ScrollLoadResult {
  scroll: ScrollObject | null;
  error?: string;
}
