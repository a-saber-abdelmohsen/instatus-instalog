import React from 'react';
import { LogEntryType } from '../../types/LogEntryType';
import './LogEntry.css'
import { getGradientColors } from '../../Helpers/AvatarColors';

interface LogEntryProps {
  log: LogEntryType;
  expand: boolean;
  onClick: () => void;
}

const LogEntry: React.FC<LogEntryProps> = ({ log, expand, onClick }) => {

  let {color1, color2} = getGradientColors(log.actor_id)

  return expand ?
    (
      <div className={`log-entry w-full banner-container ${expand ? 'expanded' : 'collapsed'}`}>
        <div className="banner">
          <div className='flex banner-row'>
            <div className='flex-1'>
              <div className='banner-sec-title'>ACTOR</div>
              <div className='flex items-start banner-sec' >
                <div className='w-1/3 banner-sec-data-title'>
                  Name
                </div>
                <div className='w-2/3 banner-sec-data'>
                  {log.actor_name}
                </div>
              </div>
              <div className='flex items-start banner-sec' >
                <div className='w-1/3 banner-sec-data-title'>
                  ID
                </div>
                <div className='w-2/3 banner-sec-data'>
                  {log.actor_id}
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <div className='banner-sec-title'>ACTION</div>
              <div className='flex items-start banner-sec' >
                <div className='banner-sec-data-title'>
                  Name
                </div>
                <div className='banner-sec-data'>
                  {log.action.name}
                </div>
              </div>
              <div className='flex items-start banner-sec' >
                <div className='banner-sec-data-title'>
                  Object
                </div>
                <div className='banner-sec-data'>
                  {log.action.object}
                </div>
              </div>
              <div className='flex items-start banner-sec' >
                <div className='banner-sec-data-title'>
                  ID
                </div>
                <div className='banner-sec-data'>
                  {log.action.id}
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <div className='banner-sec-title'>DATE</div>
              <div className='flex items-start banner-sec' >
                <div className='banner-sec-data-title'>
                  Readable
                </div>
                <div className='banner-sec-data'>
                  {new Date(log.occurred_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex banner-row">
            <div className='flex-1'>
              <div className='banner-sec-title'>METADATA</div>
              {Object.keys(log.metadata).map((key) => (
                <div className='flex items-start banner-sec' >
                  <div className='w-1/3 banner-sec-data-title'>
                    {key}
                  </div>
                  <div className='w-2/3 banner-sec-data'>
                    {log.metadata[key]}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex-1'>
              <div className='banner-sec-title'>TARGET</div>
              <div className='flex items-start banner-sec' >
                <div className='banner-sec-data-title'>
                  Name
                </div>
                <div className='banner-sec-data'>
                  {log.target_name}
                </div>
              </div>
              <div className='flex items-start banner-sec' >
                <div className='banner-sec-data-title'>
                  ID
                </div>
                <div className='banner-sec-data'>
                  {log.target_id}
                </div>
              </div>
            </div>
            <div className='flex-1'>
            </div>
          </div>
        </div>

      </div>
    )
    :
    (
      <div className=" log-entry flex justify-between items-center p-4 hover:bg-gray-50 hover:cursor-pointer" onClick={onClick}>
        <div className="flex flex-1 items-center log-table-data">
          <div
            className="flex-shrink-0 h-8 w-8 rounded-full text-white flex items-center justify-center mr-4" style={{ background: `linear-gradient(138.62deg, ${color1} 14.17%, ${color2} 84.99%)` }}>
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
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    )
};

export default LogEntry;