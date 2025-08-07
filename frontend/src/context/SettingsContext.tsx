import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ExportFormat } from '../types';

export interface SettingsContextType {
  eventsPerPage: number;
  setEventsPerPage: (value: number) => void;
  chartAnimationsEnabled: boolean;
  setChartAnimationsEnabled: (enabled: boolean) => void;
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  includeMetadata: boolean;
  setIncludeMetadata: (include: boolean) => void;
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
  exportFormat: 'csv' as ExportFormat,
  includeMetadata: true,
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

  const [exportFormat, setExportFormatState] = useState<ExportFormat>(() => {
    const saved = localStorage.getItem('analytics-settings-exportFormat');
    return saved ? (saved as ExportFormat) : DEFAULT_SETTINGS.exportFormat;
  });

  const [includeMetadata, setIncludeMetadataState] = useState<boolean>(() => {
    const saved = localStorage.getItem('analytics-settings-includeMetadata');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS.includeMetadata;
  });

  // Track if settings have been modified but not saved
  const [isDirty, setIsDirty] = useState(false);
  const [savedEventsPerPage, setSavedEventsPerPage] = useState(eventsPerPage);
  const [savedChartAnimations, setSavedChartAnimations] = useState(chartAnimationsEnabled);
  const [savedExportFormat, setSavedExportFormat] = useState(exportFormat);
  const [savedIncludeMetadata, setSavedIncludeMetadata] = useState(includeMetadata);

  // Update dirty state when settings change
  useEffect(() => {
    const hasChanges = 
      eventsPerPage !== savedEventsPerPage || 
      chartAnimationsEnabled !== savedChartAnimations ||
      exportFormat !== savedExportFormat ||
      includeMetadata !== savedIncludeMetadata;
    setIsDirty(hasChanges);
  }, [eventsPerPage, chartAnimationsEnabled, exportFormat, includeMetadata, savedEventsPerPage, savedChartAnimations, savedExportFormat, savedIncludeMetadata]);

  const setEventsPerPage = (value: number) => {
    setEventsPerPageState(value);
  };

  const setChartAnimationsEnabled = (enabled: boolean) => {
    setChartAnimationsEnabledState(enabled);
  };

  const setExportFormat = (format: ExportFormat) => {
    setExportFormatState(format);
  };

  const setIncludeMetadata = (include: boolean) => {
    setIncludeMetadataState(include);
  };

  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem('analytics-settings-eventsPerPage', eventsPerPage.toString());
    localStorage.setItem('analytics-settings-chartAnimations', JSON.stringify(chartAnimationsEnabled));
    localStorage.setItem('analytics-settings-exportFormat', exportFormat);
    localStorage.setItem('analytics-settings-includeMetadata', JSON.stringify(includeMetadata));
    
    // Update saved state to match current state
    setSavedEventsPerPage(eventsPerPage);
    setSavedChartAnimations(chartAnimationsEnabled);
    setSavedExportFormat(exportFormat);
    setSavedIncludeMetadata(includeMetadata);
  };

  const value: SettingsContextType = {
    eventsPerPage,
    setEventsPerPage,
    chartAnimationsEnabled,
    setChartAnimationsEnabled,
    exportFormat,
    setExportFormat,
    includeMetadata,
    setIncludeMetadata,
    saveSettings,
    isDirty,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};