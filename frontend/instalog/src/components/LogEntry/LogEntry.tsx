import React from 'react';
import { LogEntryType } from '../../types/LogEntryType';
import './LogEntry.css'

interface LogEntryProps {
  log: LogEntryType;
  expand: boolean
}

const LogEntry: React.FC<LogEntryProps> = ({ log, expand }) => {
  return expand ?
    (
      <></>
    )
    :
    (
      <div className="flex justify-between items-center p-4 hover:bg-gray-50">
        <div className="flex flex-1 items-center log-table-data">
          <div
            className="flex-shrink-0 h-8 w-8 rounded-full background-gradient-1 text-white flex items-center justify-center mr-4">
            {log.actor_name.split('')[0]}
          </div>
          <div className="text-sm font-medium text-gray-900 log-table-data">{log.actor_name}</div>
        </div>
        <div className="flex-1 text-sm text-gray-500 log-table-data">{log.action.name}</div>
        <div className="flex-1 flex justify-between text-sm text-gray-500 log-table-data">
          <span>{new Date(log.occurred_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })}</span>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    )
};

export default LogEntry;