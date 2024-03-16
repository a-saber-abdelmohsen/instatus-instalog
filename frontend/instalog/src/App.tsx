import React from 'react';
import useSWR from 'swr';
import { LogEntryType } from './types/LogTypes';
import LogEntry from './components/LogEntry/LogEntry';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Header from './components/Header/Header';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const App: React.FC = () => {
  const { data, error } = useSWR<LogEntryType[]>('http://localhost:3000/events', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleLoadMore = () => {
    // Logic to load more logs
  };

  const Search = () => {
    // Logic to load more logs
  };

  return (
    <div className="App bg-gray-100 font-sans">
      <div className="bg-white rounded shadow-md">
        <div className="p-6">
          <Header onSearch={Search} />
          <ul className="divide-y divide-gray-200">
            {data.map((log) => (
              <LogEntry key={log.id} log={log} />
            ))}
          </ul>
          <LoadMoreButton onLoadMore={handleLoadMore} />
        </div>
      </div>
    </div>
  );
};

export default App;