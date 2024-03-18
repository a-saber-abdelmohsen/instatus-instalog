import React, { useState } from 'react';
import useSWRInfinite from 'swr/infinite';
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
  const [searchKey, setSearchKey] = useState<string>('');
  const [loadMoreAvailable, setLoadMoreState] = useState<boolean>(true);
  const [cursorId, setCursorId] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const getKey = (pageIndex: number, previousPageData: EventsPaginationResponse | null) => {
    //first page is 1 
    pageIndex = pageIndex + 1;
    let url = `http://localhost:3000/events?pageNumber=${pageIndex}`

    if (searchKey && searchKey.trim() !== "") {
      url = url + `&searchKey=${searchKey}`
    }

    if (cursorId) {
      url = url + `&cursor_id=${cursorId}`
    }

    if (previousPageData && !(previousPageData.pagination.hasNext)) {
      setLoadMoreState(false)
    }
    return url;
  };

  const { data, error, size, setSize } = useSWRInfinite<EventsPaginationResponse>(getKey, fetcher); 
  let searchTimeout: NodeJS.Timeout | null = null;

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleLoadMore = () => {
    setSize(size + 1); // Increment page size to fetch the next page
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
      setCursorId(null);
      setLoadMoreState(true);
      setExpandedLogId(null);
      setSize(1);
    }, 1000);
  };

  const handleLogClick = (logId: string) => {
    if (expandedLogId === logId) {
      setExpandedLogId(null); // Collapse if already expanded
    } else {
      setExpandedLogId(logId); // Expand clicked log
    }
  };

  if (data && data[0]?.events.length > 0 && !cursorId) {
    setCursorId(data[0].events[0].id);
  }

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
            {data.map((pageData, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {pageData.events.map((log, index) => (
                  <LogEntry
                    key={log.id}
                    log={log}
                    expand={expandedLogId === log.id}
                    onClick={() => handleLogClick(log.id)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>

          {loadMoreAvailable ? <LoadMoreButton onLoadMore={handleLoadMore} /> : null}
        </div>
      </div>
    </div>
  );
};

export default App;