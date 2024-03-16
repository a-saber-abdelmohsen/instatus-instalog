import React from 'react';
import { LogEntryType } from '../../types/LogTypes';
import './LogEntry.css'

interface LogEntryProps {
  log: LogEntryType;
}

const LogEntry: React.FC<LogEntryProps> = ({ log }) => {
  return (
    <tr className=" hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap log-table-data">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="flex-shrink-0 h-8 w-8 rounded-full background-gradient-10 text-white flex items-center justify-center mr-4">{log.actor_name.split('')[0]}</div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">{log.actor_name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap log-table-data">
        {log.action.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap log-table-data">
        {new Date(log.occurred_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default LogEntry;