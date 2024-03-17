import React, { useState } from 'react';
import useSWR from 'swr';
import LogEntry from './components/LogEntry/LogEntry';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Header from './components/Header/Header';
import './App.css';
import { EventsPaginationResponse } from './types/EventsPaginationResponse';


const fetcher = async (url: string): Promise<EventsPaginationResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Failed to fetch data');
  }
  return response.json();
};
const App: React.FC = () => {
  const { data, error, mutate } = useSWR<EventsPaginationResponse>('http://localhost:3000/events', fetcher);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loadMoreAvailable, setLoadMoreState] = useState<boolean>(true);
  let searchTimeout: NodeJS.Timeout | null = null;

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleLoadMore = async () => {
    const nextPageNumber = pageNumber + 1;
    let url = `http://localhost:3000/events?pageNumber=${nextPageNumber}&&searchKey=${searchKey}`;
    if (searchKey === "") {
      url = `http://localhost:3000/events?pageNumber=${nextPageNumber}`;
    }
    const newData = await fetcher(url);
    // Assuming data structure remains consistent
    const updatedData = {
      ...data,
      events: [...data.events, ...newData.events],
    };
    setPageNumber(nextPageNumber);
    setLoadMoreState(newData.pagination.hasNext)
    mutate(updatedData, false); // Update the data without re-fetching
  };

  const handleSearch = (query: string) => {
    // Clear previous timeout if exists
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    // Set new timeout
    searchTimeout = setTimeout(async () => {
      let url = `http://localhost:3000/events?searchKey=${query}`;
      if (query === "") {
        url = `http://localhost:3000/events`;
      }
      setSearchKey(query);
      const newData = await fetcher(url);
      setLoadMoreState(newData.pagination.hasNext)
      setPageNumber(1);
      setExpandedLogId(null);
      mutate(newData, false);
    }, 1000);
  };

  const handleLogClick = (logId: string) => {
    if (expandedLogId === logId) {
      setExpandedLogId(null); // Collapse if already expanded
    } else {
      setExpandedLogId(logId); // Expand clicked log
    }
  };

  return (
    <div className="App bg-gray-100 font-sans">
      <div className="bg-white rounded">
        <div className="main-container">
          <Header onSearch={handleSearch} />
          <div className='flex list-title-container'>
            <div className='flex-1 list-title'>ACTOR</div>
            <div className='flex-1 list-title'>ACTION</div>
            <div className='flex-1 list-title'>DATE</div>
          </div>
          <div >
            {
              data.events.map((log, index) => (
                <LogEntry
                  key={log.id}
                  log={log}
                  expand={expandedLogId === log.id} // Pass whether to expand or not
                  onClick={() => handleLogClick(log.id)} // Pass onClick handler
                />
              ))}
          </div>

          {loadMoreAvailable ? <LoadMoreButton onLoadMore={handleLoadMore} /> : null}
        </div>
      </div>
    </div>
  );
};

export default App;