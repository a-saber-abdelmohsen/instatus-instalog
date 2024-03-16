import React from 'react';
import { LogEntryType } from '../../types/LogTypes';

interface LogEntryProps {
  log: LogEntryType;
}

const LogEntry: React.FC<LogEntryProps> = ({ log }) => {
  return (
    <li className="flex justify-between items-center p-6 hover:bg-gray-50">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">{log.actor_name.split('')[0]}</div>
        <div className="text-sm font-medium text-gray-900">{log.actor_name}</div>
      </div>
      <div className="text-sm text-gray-500">{log.action.name}</div>
      <div className="text-sm text-gray-500">{new Date(log.occurred_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}</div>
      <div className="text-sm text-gray-500">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default LogEntry;