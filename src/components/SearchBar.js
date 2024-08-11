
import React from 'react';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
        />
    );
};

export default SearchBar;
