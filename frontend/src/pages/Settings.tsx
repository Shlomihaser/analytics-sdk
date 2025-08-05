import React, { useState } from 'react';
import { Moon, Sun, RefreshCw, Download, Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

export const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { 
    eventsPerPage, 
    setEventsPerPage, 
    chartAnimationsEnabled, 
    setChartAnimationsEnabled, 
    saveSettings, 
    isDirty 
  } = useSettings();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your analytics dashboard experience
        </p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Theme</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dark Mode
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark themes
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Refresh Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Data Refresh</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto Refresh
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically refresh data at regular intervals (Currently disabled)
              </p>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors opacity-50 cursor-not-allowed ${
                autoRefresh ? 'bg-green-600' : 'bg-gray-200'
              }`}
              title="Auto-refresh feature is currently disabled"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {/* Info notice about auto-refresh */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              ℹ️ Auto-refresh is currently disabled to improve performance. Data will refresh when you navigate between pages or manually reload.
            </p>
          </div>
          
          {autoRefresh && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Refresh Interval (seconds)
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Export Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Download className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Export Format
            </label>
            <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Include Metadata
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Include metadata in exported files
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <RefreshCw className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Events per Page
            </label>
            <select 
              value={eventsPerPage}
              onChange={(e) => setEventsPerPage(Number(e.target.value))}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={10}>10 events</option>
              <option value={20}>20 events</option>
              <option value={50}>50 events</option>
              <option value={100}>100 events</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={chartAnimationsEnabled}
              onChange={(e) => setChartAnimationsEnabled(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Enable chart animations
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end items-center space-x-3">
        {showSaveSuccess && (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <Check className="w-4 h-4 mr-1" />
            <span className="text-sm">Settings saved!</span>
          </div>
        )}
        <button 
          onClick={() => {
            saveSettings();
            setShowSaveSuccess(true);
            setTimeout(() => setShowSaveSuccess(false), 3000);
          }}
          disabled={!isDirty}
          className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
            isDirty 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isDirty ? 'Save Settings' : 'Settings Saved'}
        </button>
      </div>
    </div>
  );
};