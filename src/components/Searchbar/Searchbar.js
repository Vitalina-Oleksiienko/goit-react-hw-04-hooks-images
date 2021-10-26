import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onSearchFormSubmit }) {
  const [search, setSearch] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (search.trim() !== '') {
      onSearchFormSubmit(search);
      setSearch('');
    } else alert('Add your search query');
  };
  const onChange = e => {
    setSearch(e.target.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={onChange}
          name="searh"
          value={search}
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};