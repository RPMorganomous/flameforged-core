import type { ScrollMetadata, ScrollSection, ScrollObject } from './scrollTypes';
import { cloudPost } from "@/utils/cloudPost";
import type { ScrollAnalysisRequest, ScrollAnalysisResponse } from "@/modules/cloud";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

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

export const requestCloudScrollSummary = async (
  scrollText: string
): Promise<ScrollAnalysisResponse> => {
  // Check if CloudConfig.baseUrl is set
  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      title: "",
      sections: [],
      summary: "Cloud unreachable — baseUrl not set.",
      tags: []
    };
  }

  const path = "/scroll-summary";

  const payload: ScrollAnalysisRequest = {
    scroll: scrollText
  };

  const res = await cloudPost(path, payload);

  if (!res || res.ok === false) {
    return {
      ok: false,
      title: "",
      sections: [],
      summary: "Cloud unreachable — running offline.",
      tags: []
    };
  }

  return res as ScrollAnalysisResponse;
};
