import React from 'react';
import useSWR from 'swr';
import LogEntry from './components/LogEntry/LogEntry';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Header from './components/Header/Header';
import './App.css';
import { EventsPaginationResponse } from './types/EventsPaginationResponse';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const App: React.FC = () => {
  const { data, error } = useSWR<EventsPaginationResponse>('http://localhost:3000/events', fetcher);

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
            <div className='flex list-title-container'>
                <div className='flex-1 list-title'>ACTOR</div>
                <div className='flex-1 list-title'>ACTION</div>
                <div className='flex-1 list-title'>DATE</div>
            </div>
            <div >
              {data.events.map((log, index) => (
                <LogEntry key={log.id} log={log} expand={false} />
              ))}
            </div>
          
          {data.pagination.hasNext ? <LoadMoreButton  onLoadMore={handleLoadMore}/> : null}
        </div>
      </div>
    </div>
  );
};

export default App;