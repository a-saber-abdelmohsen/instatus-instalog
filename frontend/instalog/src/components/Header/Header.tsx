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
    <header className="bg-white">
      {/* Your header layout */}
      <input
        type="text"
        onChange={handleSearch}
        className="w-full p-3 rounded-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search name, email or action..."
      />
    </header>
  );
};

export default Header;
