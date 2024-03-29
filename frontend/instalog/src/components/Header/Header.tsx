import React, { FC, FormEvent, useEffect, useState } from 'react';
import './Header.css';

interface FiltersProps {
  actor_id: string;
  setActorId: React.Dispatch<React.SetStateAction<string>>;
  target_id: string;
  setTarget_id: React.Dispatch<React.SetStateAction<string>>;
  action_id: string;
  setAction_id: React.Dispatch<React.SetStateAction<string>>;
}

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  formatEventsAsCSV: () => void;
  filters: FiltersProps;
  onLiveButtonClicked: () => void;

}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearch, formatEventsAsCSV, filters, onLiveButtonClicked }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  function handleFormatEventsAsCSV(event: any): void {
    formatEventsAsCSV();
  }

  function handleFiltersButtonClicked(event: any): void {
    setfiltersOpened(!filtersOpened);
  }

  const [liveEnabled, setLiveEnabled] = useState<boolean>(false);
  const [filtersOpened, setfiltersOpened] = useState<boolean>(false);

  function handleLiveButtonClicked(event: any): void {
    setLiveEnabled(!liveEnabled);
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setfiltersOpened(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  function handleFiltersApply(event: FormEvent<HTMLFormElement>): void {

    event.preventDefault();
    setfiltersOpened(false);
    // Retrieve field values
    const form = event.currentTarget;
    const actorId = (form.querySelector('#actor_id') as HTMLInputElement)?.value;
    const targetId = (form.querySelector('#target_id') as HTMLInputElement)?.value;
    const actionId = (form.querySelector('#action_id') as HTMLInputElement)?.value;

    filters.setAction_id(actionId);
    filters.setTarget_id(targetId);
    filters.setActorId(actorId);

  }

  return (
    <header className="bg-white search-input-container flex">
      <input
        type="text"
        defaultValue={`${searchQuery}`}
        onChange={handleSearch}
        className="search-input p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
        placeholder="Search name, email or action..."
      />
      <button onClick={handleFiltersButtonClicked} className='header-button flex justify-center items-center'>
        <span className='pr-1'>
          <svg width="11" height="15" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 2.25H0.75C0.551088 2.25 0.360322 2.17098 0.21967 2.03033C0.0790177 1.88968 0 1.69891 0 1.5C0 1.30109 0.0790177 1.11032 0.21967 0.96967C0.360322 0.829018 0.551088 0.75 0.75 0.75H14.25C14.4489 0.75 14.6397 0.829018 14.7803 0.96967C14.921 1.11032 15 1.30109 15 1.5C15 1.69891 14.921 1.88968 14.7803 2.03033C14.6397 2.17098 14.4489 2.25 14.25 2.25ZM11.75 5.75H3.25C3.05109 5.75 2.86032 5.67098 2.71967 5.53033C2.57902 5.38968 2.5 5.19891 2.5 5C2.5 4.80109 2.57902 4.61032 2.71967 4.46967C2.86032 4.32902 3.05109 4.25 3.25 4.25H11.75C11.9489 4.25 12.1397 4.32902 12.2803 4.46967C12.421 4.61032 12.5 4.80109 12.5 5C12.5 5.19891 12.421 5.38968 12.2803 5.53033C12.1397 5.67098 11.9489 5.75 11.75 5.75ZM8.75 9.25H6.25C6.05109 9.25 5.86032 9.17098 5.71967 9.03033C5.57902 8.88968 5.5 8.69891 5.5 8.5C5.5 8.30109 5.57902 8.11032 5.71967 7.96967C5.86032 7.82902 6.05109 7.75 6.25 7.75H8.75C8.94891 7.75 9.13968 7.82902 9.28033 7.96967C9.42098 8.11032 9.5 8.30109 9.5 8.5C9.5 8.69891 9.42098 8.88968 9.28033 9.03033C9.13968 9.17098 8.94891 9.25 8.75 9.25Z" fill="#575757" />
          </svg>
        </span>
        <span>FILTER</span>
      </button>
      <div className={`filters-modal ${filtersOpened ? "" : "hide"}`}>
        <div className='flex justify-start items-center'>
          <span className='pr-1'>
            <svg width="11" height="15" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.25 2.25H0.75C0.551088 2.25 0.360322 2.17098 0.21967 2.03033C0.0790177 1.88968 0 1.69891 0 1.5C0 1.30109 0.0790177 1.11032 0.21967 0.96967C0.360322 0.829018 0.551088 0.75 0.75 0.75H14.25C14.4489 0.75 14.6397 0.829018 14.7803 0.96967C14.921 1.11032 15 1.30109 15 1.5C15 1.69891 14.921 1.88968 14.7803 2.03033C14.6397 2.17098 14.4489 2.25 14.25 2.25ZM11.75 5.75H3.25C3.05109 5.75 2.86032 5.67098 2.71967 5.53033C2.57902 5.38968 2.5 5.19891 2.5 5C2.5 4.80109 2.57902 4.61032 2.71967 4.46967C2.86032 4.32902 3.05109 4.25 3.25 4.25H11.75C11.9489 4.25 12.1397 4.32902 12.2803 4.46967C12.421 4.61032 12.5 4.80109 12.5 5C12.5 5.19891 12.421 5.38968 12.2803 5.53033C12.1397 5.67098 11.9489 5.75 11.75 5.75ZM8.75 9.25H6.25C6.05109 9.25 5.86032 9.17098 5.71967 9.03033C5.57902 8.88968 5.5 8.69891 5.5 8.5C5.5 8.30109 5.57902 8.11032 5.71967 7.96967C5.86032 7.82902 6.05109 7.75 6.25 7.75H8.75C8.94891 7.75 9.13968 7.82902 9.28033 7.96967C9.42098 8.11032 9.5 8.30109 9.5 8.5C9.5 8.69891 9.42098 8.88968 9.28033 9.03033C9.13968 9.17098 8.94891 9.25 8.75 9.25Z" fill="#575757" />
            </svg>
          </span>
          <span className='text-gray-600'>FILTER</span>
        </div>
        <form onSubmit={handleFiltersApply}>
          <div className="grid gap-3 mb-3 md:grid-cols-2 mt-4">
            <div>
              <input type="text" id="actor_id" className="text-sm rounded-lg w-full p-1.5 filters-modal-input" placeholder="ACTOR ID" defaultValue={filters.actor_id}/>
            </div>
            <div>
              <input type="text" id="target_id" className="text-sm rounded-lg w-full p-1.5 filters-modal-input" placeholder="TARGET ID" defaultValue={filters.target_id}/>
            </div>
            <div>
              <input type="text" id="action_id" className="text-sm rounded-lg w-full p-1.5 filters-modal-input" placeholder="ACTION ID" defaultValue={filters.action_id}/>
            </div>
          </div>

          <button type="submit" className="text-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto pr-2 pt-3 text-center ">APPLY</button>
        </form>
      </div>
      <button onClick={handleFormatEventsAsCSV} className='header-button flex justify-center items-center'>
        <span className='pr-1'>
          <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.01562 4.6875H5.96875V9.18076L7.5124 7.6374C7.60103 7.55321 7.71903 7.50696 7.84127 7.50852C7.9635 7.51009 8.08028 7.55934 8.16672 7.64578C8.25316 7.73222 8.30241 7.849 8.30398 7.97123C8.30554 8.09347 8.25929 8.21147 8.1751 8.3001L5.83135 10.6438C5.74345 10.7317 5.62427 10.781 5.5 10.781C5.37573 10.781 5.25655 10.7317 5.16865 10.6438L2.8249 8.3001C2.74071 8.21147 2.69446 8.09347 2.69602 7.97123C2.69759 7.849 2.74684 7.73222 2.83328 7.64578C2.91972 7.55934 3.0365 7.51009 3.15874 7.50852C3.28097 7.50696 3.39897 7.55321 3.4876 7.6374L5.03125 9.18076V4.6875H1.98438C1.5494 4.68797 1.13237 4.86097 0.824792 5.16854C0.517216 5.47612 0.344215 5.89315 0.34375 6.32812V12.4219C0.344215 12.8569 0.517216 13.2739 0.824792 13.5815C1.13237 13.889 1.5494 14.062 1.98438 14.0625H9.01562C9.4506 14.062 9.86763 13.889 10.1752 13.5815C10.4828 13.2739 10.6558 12.8569 10.6562 12.4219V6.32812C10.6558 5.89315 10.4828 5.47612 10.1752 5.16854C9.86763 4.86097 9.4506 4.68797 9.01562 4.6875ZM5.96875 1.40625C5.96875 1.28193 5.91936 1.1627 5.83146 1.07479C5.74355 0.986886 5.62432 0.9375 5.5 0.9375C5.37568 0.9375 5.25645 0.986886 5.16854 1.07479C5.08064 1.1627 5.03125 1.28193 5.03125 1.40625V4.6875H5.96875V1.40625Z" fill="#575757" />
          </svg>
        </span>
        <span>EXPORT</span>
      </button>

      <button onClick={handleLiveButtonClicked} className='header-button live-header-button flex justify-center items-center'>
        <span className='pr-1'>
          <div className="flex-shrink-0 h-3 w-3 rounded-full text-white flex items-center justify-center p-1" style={{ background: liveEnabled ? "#119e37" : "#8F485D" }} >
          </div>
        </span>
        <span>LIVE</span>
      </button>
    </header>
  );
};

export default Header;
