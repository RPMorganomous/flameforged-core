import type { ScrollMetadata, ScrollSection, ScrollObject } from './scrollTypes';

export const extractMetadata = (raw: string): ScrollMetadata => {
  const lines = raw.split("\n");

  let title = "Untitled Scroll";
  let tags: string[] = [];

  for (const line of lines.slice(0, 10)) {
    if (line.startsWith("# ")) title = line.replace("# ", "").trim();
    if (line.toLowerCase().startsWith("tags:")) {
      tags = line.replace(/tags:/i, "").split(",").map(t => t.trim());
    }
  }

  return { title, tags };
};

export const extractSections = (raw: string): ScrollSection[] => {
  const lines = raw.split("\n");
  const sections: ScrollSection[] = [];

  let currentHeading = "Introduction";
  let currentContent: string[] = [];

  const flush = () => {
    sections.push({
      heading: currentHeading,
      content: currentContent.join("\n").trim()
    });
    currentContent = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentHeading = line.replace("## ", "").trim();
    } else {
      currentContent.push(line);
    }
  }

  flush();
  return sections;
};

export const processScroll = (raw: string): ScrollObject => {
  return {
    raw,
    metadata: extractMetadata(raw),
    sections: extractSections(raw)
  };
};
