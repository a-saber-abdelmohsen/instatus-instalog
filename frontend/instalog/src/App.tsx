import React, { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import LogEntry from './components/LogEntry/LogEntry';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Header from './components/Header/Header';
import './App.css';
import { EventsPaginationResponse } from './types/EventsPaginationResponse';
import { LogEntryType } from './types/LogEntryType';


const fetcher = async (url: string): Promise<EventsPaginationResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Invalid action Id');
  }
  return response.json();
};


const App: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [action_id, setAction_id] = useState<string>('');
  const [target_id, setTarget_id] = useState<string>('');
  const [actor_id, setActor_id] = useState<string>('');
  const [cursorId, setCursorId] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedLogId(null);
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const getKey = (pageIndex: number, previousPageData: EventsPaginationResponse | null) => {
    //first page is 1 
    pageIndex = pageIndex + 1;
    let baseURL = process.env.DATABASE_URL;
    if(!baseURL){
      console.log("no Base_URL provided ")
      baseURL = "http://localhost:3000"
    }

    let url = `${baseURL}/events?pageNumber=${pageIndex}`

    if (searchKey && searchKey.trim() !== "") {
      url = url + `&searchKey=${searchKey}`
    }

    if (action_id) {
      url = url + `&action_id=${action_id}`
    }

    if (target_id) {
      url = url + `&target_id=${target_id}`
    }

    if (actor_id) {
      url = url + `&actor_id=${actor_id}`
    }

    if (cursorId) {
      url = url + `&cursor_id=${cursorId}`
    }

    return url;
  };

  const { data, error, size, setSize } = useSWRInfinite<EventsPaginationResponse>(getKey, fetcher); 
  let searchTimeout: NodeJS.Timeout | null = null;

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

  // Format events data into CSV format
  const formatEventsAsCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,';
    const headers = ['Actor', 'Action', 'Date'];
    const events = data ? ([] as LogEntryType[]).concat(...data.map((d) => (d.events || []))) : [];
    const rows = events.map(event => [event.actor_name, event.action.name, event.occurred_at].join(','));

    // Combine headers and rows
    const csvRows = [headers.join(','), ...rows];

    // Join rows with newline character
    const csvString = csvContent + csvRows.join('\n');

    // Create a data URI and trigger download
    const encodedURI = encodeURI(csvString);
    const link = document.createElement('a');
    link.setAttribute('href', encodedURI);
    link.setAttribute('download', 'events.csv');
    document.body.appendChild(link);
    link.click();
  };

  const onLiveButtonClicked = () => {
    
  };

  
  const totalEventsCount = data?.reduce((total, page) => total + page.events.length, 0);
  if (error) return <h2>Failed to load the data {`${error}`}</h2>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className="App bg-gray-100 font-sans">
      <div className="bg-white rounded">
        <div className="main-container">
          <Header searchQuery={searchKey} onSearch={handleSearch} formatEventsAsCSV={formatEventsAsCSV} filters={{
            action_id: action_id,
            setAction_id: setAction_id,
            target_id: target_id,
            setTarget_id: setTarget_id,
            actor_id: actor_id,
            setActorId: setActor_id
          }} onLiveButtonClicked={onLiveButtonClicked}/>
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

          {!(totalEventsCount == data[0]?.pagination.totalCount) ? <LoadMoreButton onLoadMore={handleLoadMore} /> : null}
        </div>
      </div>
    </div>
  );
};

export default App;