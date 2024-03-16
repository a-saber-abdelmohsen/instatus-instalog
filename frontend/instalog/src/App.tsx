import React from 'react';
import useSWR from 'swr';
import { LogEntryType } from './types/LogTypes';
import LogEntry from './components/LogEntry/LogEntry';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Header from './components/Header/Header';
import './App.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const App: React.FC = () => {
  const { data, error } = useSWR<LogEntryType[]>('http://localhost:3000/events', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleLoadMore = () => {
    // Logic to load more logs
  };

  const Search = () => {
    // Logic to search
  };

  return (
    <div className="App bg-gray-100 font-sans">
      <div className="bg-white rounded">
        <div className="main-container">
          <Header onSearch={Search} />
          <table className="min-w-full">
            <thead >
              <tr className='text-left log-table-header'>
                <th >ACTOR</th>
                <th >ACTION</th>
                <th >DATE</th>
                <th ></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-medium">
              {data.map((log) => (
                <LogEntry key={log.id} log={log} />
              ))}
            </tbody>
          </table>
          <LoadMoreButton onLoadMore={handleLoadMore} />
        </div>
      </div>
    </div>
  );
};

export default App;