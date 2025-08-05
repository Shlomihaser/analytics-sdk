import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SettingsContextType {
  eventsPerPage: number;
  setEventsPerPage: (value: number) => void;
  chartAnimationsEnabled: boolean;
  setChartAnimationsEnabled: (enabled: boolean) => void;
  saveSettings: () => void;
  isDirty: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

// Default settings
const DEFAULT_SETTINGS = {
  eventsPerPage: 10,
  chartAnimationsEnabled: true,
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // Load settings from localStorage on init
  const [eventsPerPage, setEventsPerPageState] = useState<number>(() => {
    const saved = localStorage.getItem('analytics-settings-eventsPerPage');
    return saved ? parseInt(saved, 10) : DEFAULT_SETTINGS.eventsPerPage;
  });

  const [chartAnimationsEnabled, setChartAnimationsEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('analytics-settings-chartAnimations');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS.chartAnimationsEnabled;
  });

  // Track if settings have been modified but not saved
  const [isDirty, setIsDirty] = useState(false);
  const [savedEventsPerPage, setSavedEventsPerPage] = useState(eventsPerPage);
  const [savedChartAnimations, setSavedChartAnimations] = useState(chartAnimationsEnabled);

  // Update dirty state when settings change
  useEffect(() => {
    const hasChanges = 
      eventsPerPage !== savedEventsPerPage || 
      chartAnimationsEnabled !== savedChartAnimations;
    setIsDirty(hasChanges);
  }, [eventsPerPage, chartAnimationsEnabled, savedEventsPerPage, savedChartAnimations]);

  const setEventsPerPage = (value: number) => {
    setEventsPerPageState(value);
  };

  const setChartAnimationsEnabled = (enabled: boolean) => {
    setChartAnimationsEnabledState(enabled);
  };

  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem('analytics-settings-eventsPerPage', eventsPerPage.toString());
    localStorage.setItem('analytics-settings-chartAnimations', JSON.stringify(chartAnimationsEnabled));
    
    // Update saved state to match current state
    setSavedEventsPerPage(eventsPerPage);
    setSavedChartAnimations(chartAnimationsEnabled);
  };

  const value: SettingsContextType = {
    eventsPerPage,
    setEventsPerPage,
    chartAnimationsEnabled,
    setChartAnimationsEnabled,
    saveSettings,
    isDirty,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};