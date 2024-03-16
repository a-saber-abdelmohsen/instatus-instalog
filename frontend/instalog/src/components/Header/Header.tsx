import React, { FC } from 'react';
import './Header.css';

// components/Header.tsx
interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <header className="bg-white search-input-container">
      <input
        type="text"
        onChange={handleSearch}
        className="search-input w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
        placeholder="Search name, email or action..."
      />
    </header>
  );
};

export default Header;
