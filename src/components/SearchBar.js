import React, { Component } from 'react';

class SearchBar extends Component {
    render() {
        const { searchQuery, handleSearchChange } = this.props;

        return (
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                style={styles.input}
            />
        );
    }
}

const styles = {
    input: {
        padding: '10px',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
        outline: 'none',
        color: '#333',
        backgroundColor: '#f9f9f9'
    }
};

export default SearchBar;
