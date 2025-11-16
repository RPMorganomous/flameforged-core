import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ScrollObject } from './scrollTypes';
import { processScroll } from './ScrollProcessor';
import { lambdaExtractScroll } from '../lambda/LambdaService';

interface ScrollContextValue {
  loadScroll: (file: File) => Promise<void>;
  scroll: ScrollObject | null;
  error: string | null;
  lambdaExtract: () => Promise<void>;
  lambdaScrollStatus: string | null;
}

const ScrollContext = createContext<ScrollContextValue | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scroll, setScroll] = useState<ScrollObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lambdaScrollStatus, setLambdaScrollStatus] = useState<string | null>(null);

  const loadScroll = async (file: File): Promise<void> => {
    try {
      const raw = await file.text();
      const scrollObject = processScroll(raw);

      setScroll(scrollObject);
      setError(null);

      console.log('[Scroll] Loaded');
      console.log('[Scroll] Metadata:', scrollObject.metadata);
      console.log('[Scroll] Sections:', scrollObject.sections.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setScroll(null);
      console.error('[Scroll] Load error:', errorMessage);
    }
  };

  const lambdaExtract = async (): Promise<void> => {
    const result = await lambdaExtractScroll();
    if (result.ok && result.data) {
      setLambdaScrollStatus(result.data);
    }
  };

  const value: ScrollContextValue = {
    loadScroll,
    scroll,
    error,
    lambdaExtract,
    lambdaScrollStatus,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};
